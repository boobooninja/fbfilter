# required gem includes
require 'sinatra'
require "sinatra/json"

# require file includes
# require_relative 'lib/rps.rb'

enable :sessions

set :bind, '0.0.0.0' # Vagrant fix
set :port, 9494

get '/' do
	# erb :login
end

