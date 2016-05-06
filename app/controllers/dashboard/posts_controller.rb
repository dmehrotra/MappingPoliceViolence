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
				@post.assign_shortcode
				redirect_to dashboard_posts_path
			else
				render :json => {errors: @post.errors.full_messages}	
			end
		end
		def edit
			@post = Post.find(params[:id])

		end
		def update
			@post = Post.find(params[:id])
			@post.update(post_params)
			if @post.save
				@post.assign_shortcode
				redirect_to dashboard_posts_path
			else
				redirect_to edit_dashboard_post_path(@post.id)
			end
		end
		def show
		end
		def destroy
			Post.find(params[:id]).delete
			redirect_to dashboard_posts_path
		end
		private	
  		def post_params
	      params.require(:post).permit(:title,:description,:shortcode,:image,:tag_ids => [])
	    end
	end
end
