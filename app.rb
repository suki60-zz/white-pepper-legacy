# frozen_string_literal: true

require 'sinatra'
require 'sequel'
require 'mysql2'
require 'yaml'
require 'json'

if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'better_errors'
end

class WhitePepper < Sinatra::Base
  enable :sessions
  set :session_secret, 'secret'

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
    user_id = session[:session_id][0..6]
    user = User[user_id]

    pepper = Pepper.where(id: params[:id].to_i).first

    if pepper
      pepper.text = params[:text]
    else
      pepper = Pepper.new(text: params[:text],
                          client_x: params[:client_x],
                          client_y: params[:client_y],
                          user_id: user.id)
    end

    pepper.save(raise_on_failure: false)

    JSON.generate(id: pepper&.id)
  end

  delete '/pepper' do
    puts params[:id]
    Pepper.where(id: params[:id].to_i).delete

    JSON.generate(pepper: 'deleted')
  end
end
