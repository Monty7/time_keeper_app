class UsersController < ApplicationController


    def create
        
        user = user = User.find_or_create_by(user_params)

        render json: {id: user.id, name: user.name}
    end


    def destroy
        session.clear
    end

    private
    
    def user_params
        params.require(:user).permit(:name)
    end
end
