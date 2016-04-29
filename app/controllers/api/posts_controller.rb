module Api
	class PostsController < ApplicationController
		def all
			posts = Post.all
			about = About.all.first
			json = {
				posts: posts.to_json(:include => :tags),
				about: about.to_json

			}
		 	render :json => json	
		end
	end
end
