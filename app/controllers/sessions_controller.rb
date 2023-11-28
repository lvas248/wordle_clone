class SessionsController < ApplicationController

    def create #login
        user = User.find_by(email: user_params[:email])

        if(user&.authenticate(user_params[:password]))
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: { error: 'Invalid email or password'}, status: :unauthorized
        end
        
    end

    def destroy #logout
        user = User.find(session[:user_id])
        session.delete :user_id
        head :no_content
    end

    private

    def user_params
        params.require(:user).permit(:email, :password)
    end

 
    
end
