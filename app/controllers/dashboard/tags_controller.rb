module Dashboard
	class TagsController < ApplicationController
		def index
		end
		def show
		end
		def new
			@tag = Tag.new
		end
		
		def create
			@tag = Tag.new(tag_params)
			if @tag.save
				redirect_to dashboard_tags_path
			else
				binding.pry
				redirect_to new_dashboard_tag_path
			end
		end

		def edit
		end
		def update
		end
		private	
  		def tag_params
	      params.require(:tag).permit(:name,:post_ids => [])
	    end
	end
end