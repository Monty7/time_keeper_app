class User < ApplicationRecord
    has_many :user_times

    #create a new model called month_hours that belongs to a uwer 
    #every month a user gets a new month_hours instance 
    #that instance has two attributes the name of the month and the total hours 
    #you can keep track of the hours there 

    #def month_time 
        #given a certain a month, iterates over the user_times and calculates the total hours 
    #end

    def isDateDuplicated?(date)
        # binding.pry
        self.user_times.none?{ |day_time| day_time.clock_in.to_s.slice(8, 2) == date }
           # binding.pry 
    end
end
