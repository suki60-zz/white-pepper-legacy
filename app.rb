# frozen_string_literal: true

require 'sinatra'

if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'better_errors'
end

configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end

before do
  @path = request.path_info.delete('/').to_sym
end

get '/' do
  slim :index
end
