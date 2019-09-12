class UsersController < ApplicationController


    def create
        binding.pry
        if params[:name] != ""
            user = User.find_or_create_by(user_params)
            render json: {id: user.id, name: user.name}
        else
            render json: {err_message: "Name cannot be blank!"}
        end
    end



    private
    
    def user_params
        params.require(:user).permit(:name)
    end
end
