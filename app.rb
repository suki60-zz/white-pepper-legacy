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
    use BetterErrors::Middleware
    BetterErrors.application_root = __dir__
  end

  configure do
    env = ENV['RACK_ENV']
    DB = Sequel.connect(YAML.safe_load(File.open('database.yml'))[env])
  end

  before do
    @path = request.path_info.delete('/').to_sym
  end

  get '/' do
    slim :index
  end
end
