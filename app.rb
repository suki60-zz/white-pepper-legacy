# frozen_string_literal: true

require 'sinatra'
require 'sequel'
require 'mysql2'
require 'yaml'

if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'better_errors'
end

class WhitePepper < Sinatra::Base
  enable :sessions

  set :environment, ENV['RACK_ENV'].to_sym

  configure :development do
    register Sinatra::Reloader
    use BetterErrors::Middleware
    BetterErrors.application_root = __dir__
  end

  configure do
    env = ENV['RACK_ENV']
    DB = Sequel.connect(YAML.safe_load(File.open('database.yml'))[env])
  end

  require './models/pepper'
  require './models/user'

  before do
    @path = request.path_info.delete('/').to_sym
  end

  get '/' do
    user_id = session[:session_id][0..6]
    user = User[user_id]

    unless user
      user = User.new
      user.set_fields({ id: user_id, created_at: Time.now }, %i(id created_at))
      user.save(raise_on_failure: false)
    end

    @peppers = Pepper.where(user_id: user.id).all

    slim :index
  end

  put '/pepper' do
    pepper = Pepper[params[:id]]

    if pepper
      pepper.update(text: params[:text])
    else
      pepper = Pepper.new(text: params[:text],
                 client_x: params[:client_x],
                 client_y: params[:client_y])

      pepper.save(raise_on_failure: false)
    end

    json status: 200, message: 'pepper created or updated'
  end
end
