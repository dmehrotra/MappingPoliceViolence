class Tag < ActiveRecord::Base
	validates_presence_of :name
	validates_uniqueness_of :name
	has_many :tag_posts
	has_many :posts, through: :tag_posts
end