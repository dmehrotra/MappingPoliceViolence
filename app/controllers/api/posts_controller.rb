module Api
	class PostsController < ApplicationController
		def all
			@posts = Post.all
		 	render :json => @posts.to_json(:include => :tags) 
			
		end
	end
end
