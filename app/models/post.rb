class Post < ActiveRecord::Base
	validates_presence_of :title
	has_many :tag_posts
	has_many :tags, through: :tag_posts
end