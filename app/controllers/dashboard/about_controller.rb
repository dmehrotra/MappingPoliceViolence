module Dashboard
	class AboutController < ApplicationController
		include ApplicationHelper
    	before_filter :check_admin?
    	def get
    		if About.all.first.present?
    			@about = About.all.first
    		else
    			@about = About.new
    		end
    	end  
        def post
            if About.all.first.present?
                @about = About.all.first
            else
                @about = About.new()
            end
            if @about.update(about_params)
                redirect_to "/dashboard/about"
            else
                redirect_to "/dashboard/about", alert: "There was an error with your form"
            end


        end
        private 
        def about_params
          params.require(:about).permit(:content)
        end
	end
end
