class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :assign_layout
  layout :assign_layout

    def assign_layout
        if admin_dashboard_mode
            'dashboard'
      	end
  	end
  	def admin_dashboard_mode
    	self.class.parent == Dashboard
  	end

    def after_sign_in_path_for(resource)

      '/dashboard'
    end
end
