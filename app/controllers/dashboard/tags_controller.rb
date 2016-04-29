module Dashboard
	class TagsController < ApplicationController
		def index
			@tags = Tag.all
			@tag = Tag.new
		end
		def show
			@posts = Tag.find(params[:id]).posts
		end
		def new
			@tag = Tag.new
		end
		
		def create
			@tag = Tag.new(tag_params)
			if @tag.save
				redirect_to dashboard_tags_path
			else
				redirect_to dashboard_tags_path, notice: @tag.errors
			end
		end

		def edit
		end
		def update
		end
		def destroy
			Tag.find(params[:id]).delete
			redirect_to dashboard_tags_path
		end
		private	
  		def tag_params
	      params.require(:tag).permit(:name,:post_ids => [])
	    end
	end
end