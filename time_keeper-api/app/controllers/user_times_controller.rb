class UserTimesController < ApplicationController
    def index
        #display all of user's times if they have any - User.UserTimes - array index + 1 to correspond to the date
    end

    def create

        user = User.find_by(id: params[:user_id])
        binding.pry
        if user
           # binding.pry
            if (user.isDateDuplicated?(params[:date_of_times]))
                if (params[:clock_in] < params[:clock_out] || params[:clock_in] != "" || params[:clock_out] != "")
                    date = "#{params[:date_of_times]}"
                    clock_in = "#{params[:clock_in]} #{date}" #constructing dateTime
                    clock_out = "#{params[:clock_out]} #{date}" #constructing dateTime
                    times = user.user_times.create(clock_in: clock_in, clock_out: clock_out, date_of_times: params[:date_of_times])
                    render json: user, include: :user_times
                   # binding.pry
                else
                    render json: {err_message: "You entered invalid times."}
                end
            else
                render json: {err_message: "A time stamp already exist for this date.  Please update instead."}
            end
        else 
            render json: {err_message: "A user is not logged in."}
        end
     
  
    end

    def update
        binding.pry
        user = User.find_by({id: params[:user_id]})
        user.user_times.find_by({date_of_times: params[:date_of_times]})
        date = "#{params[:date_of_times]}"
        clock_in = "#{params[:clock_in]} #{date}" #constructing dateTime
        clock_out = "#{params[:clock_out]} #{date}" #constructing dateTime
        user.user_times.update({clock_in: clock_in, clock_out: clock_out })
        render json: user, include: :user_times
    end

    def destroy
    end

    # private

    # def user_times_params
    #     params.require(:user_time).permit(:clock_in, :clock_out, :month_time, :user_id)
    # end
end
