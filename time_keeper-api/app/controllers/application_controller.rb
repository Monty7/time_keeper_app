class ApplicationController < ActionController::API
    helper_method :current_user, :logged_in?

    private
        def current_user
            @user = User.find_by(id: session[:user_id]) if session[:user_id]
        end
    
        def logged_in?
            !!session[:user_id]
        end
    end
end
