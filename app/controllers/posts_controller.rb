class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
    sim = []
    @similar = []
    @post.tags.each do |t|
    	t.posts.each do |p|
			if p.id != @post.id
				sim << p
			end
    	end
    end
    @similar = sim.uniq{|x| x.id}
  end
end
