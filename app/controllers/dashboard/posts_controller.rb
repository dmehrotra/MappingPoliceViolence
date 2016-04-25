module Dashboard
	class PostsController < ApplicationController
		include ApplicationHelper
    	before_filter :check_admin?
		def index
			@posts = Post.all
	 	end
		def new
			@post = Post.new
		end
		def create
			@post = Post.new(post_params)
			if @post.save
				redirect_to dashboard_posts_path
			else
				redirect_to new_dashboard_post_path
			end
		end
		def edit
		end
		def update
		end
		def show
		end

		private	
  		def post_params
	      params.require(:post).permit(:title,:image,:tag_ids => [])
	    end
	end
end
