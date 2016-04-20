module ApplicationHelper
	 def check_admin?
        # here is a method to check if we are logged in
        # if not...redirect
        unless current_user
            redirect_to "/login"
            return
        end

    end
end
