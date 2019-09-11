class UserTimesController < ApplicationController
    def index
        #display all of user's times if they have any - User.UserTimes - array index + 1 to correspond to the date
    end

    def create
      times = UserTimes.create(user_times_params)
        binding.pry
  
    end

    def update

    end

    def destroy
    end

    private

    def user_times_params
        params.require(:user_time).permit(:clock_in, :clock_out, :month_time, :user_id)
    end
end
