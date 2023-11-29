class GamesController < ApplicationController

    def create
        user = get_user
        if user
            game = user.games.create!
            head :created
        else
            guest = get_guest
            game = guest.games.create!
            head :created
        end
    end


    private

    def get_user
        User.find_by(id: session[:user_id])
    end

    def get_guest
        User.find_by(username: 'guest')
    end


end
