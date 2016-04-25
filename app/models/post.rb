class Post < ActiveRecord::Base
	validates_presence_of :title
	mount_uploader :image, ImageUploader
	has_many :tag_posts, dependent: :delete_all
	has_many :tags, through: :tag_posts
end