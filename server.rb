# required gem includes
require 'sinatra'
require "sinatra/json"

# require file includes
# require_relative 'lib/rps.rb'

enable :sessions

set :bind, '0.0.0.0' # Vagrant fix
set :port, 9494

# get '/' do
#   result = RPS::ValidateSession.run(session)
#   if result[:success?]
#     @errors = result[:errors]
#     erb :something
#   else
#     erb :index
#   end
# end


#-------- JSON API routes -----------

# post '/api/players/:player_id/matches/:match_id/games/:game_id' do |player_id,match_id,game_id|
#   result = RPS::ValidateSession.run(session)
#   @errors = result[:errors]
#   @player = result[:player]

#   if result[:success?]
#     play_hash = {:player => @player, :match_id => match_id, :game_id => game_id, :action => params[:action]}
#     result = RPS::Play.run(play_hash)

#     result[:errors].push(@errors).flatten!
#   else
#     result = {:errors => @errors}
#   end

#   JSON(result)
# end
