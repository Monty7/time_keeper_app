class UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            #load users times in appropriate dates
        else
            render json: {error_message: "There isn't a user account under that name."}
    end
    
    def destroy
        session.clear
    end

    private
    
    def user_params
        params.require(:user).permit(:username)
    end
end
