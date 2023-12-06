class GamesController < ApplicationController

    def create
        user = get_user
        if user
            game = user.games.find_by(status: 'pending') || user.games.create!  
            render json: game, status: :created
        else
            guest = get_guest
            game = guest.games.create!
            render json: game, status: :created
        end
    end

    def show
        user = get_user
        game = user.games.find_by(status: 'pending')
        render json: game, status: :ok
    end

    



    private

    def get_user
        User.find_by(id: session[:user_id])
    end

    def get_guest
        User.find_by(username: 'guest')
    end


end
