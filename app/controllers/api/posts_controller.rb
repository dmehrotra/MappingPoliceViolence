module Api
	class PostsController < ApplicationController
		skip_before_filter :verify_authenticity_token
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
