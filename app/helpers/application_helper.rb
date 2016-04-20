module ApplicationHelper
	 def check_admin?
        unless current_user
            redirect_to "/login"
            return
        end
    end
end
