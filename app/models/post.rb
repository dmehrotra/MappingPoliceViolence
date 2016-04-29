class Post < ActiveRecord::Base
	validates_presence_of :title
	mount_uploader :image, ImageUploader
	has_many :tag_posts, dependent: :delete_all
	has_many :tags, through: :tag_posts
	validates_uniqueness_of :title

	def assign_shortcode
		if !self.shortcode.present?
			self.shortcode = "#mpv"+self.id.to_s
			self.save
		else
			if self.shortcode[0] != '#'
				self.shortcode.prepend("#")
				self.save
			end
		end
	end
end