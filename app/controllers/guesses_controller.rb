class GuessesController < ApplicationController

    def create
        user = get_user
        game = user.games.find_by(status: 'pending')
        word = Word.find_by(guess_params)
        result = game.guesses.create!(guess_params)
        render json: result, status: :created
    end

    private
    
    def guess_params
        params.require(:guess).permit(:word)
    end

    def get_user
        User.find(session[:user_id])
    end
end
