class UserTimesController < ApplicationController
    def index
        #display all of user's times if they have any - User.UserTimes - array index + 1 to correspond to the date
    end

    def create
        binding.pry
        User.UserTimes.create()
    end

    def update

    end

    def destroy
    end
end
