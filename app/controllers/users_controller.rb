class UsersController < ApplicationController

    def create #signup
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show #refresh
        user = get_user
        render json: user, status: :ok
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation, :email)
    end

    def get_user
        User.find(session[:user_id])
    end
end
