class TagPost < ActiveRecord::Base
	validates_presence_of :tag_id, :post_id
	belongs_to :tag
	belongs_to :post
	validates_uniqueness_of :post_id, scope: :tag_id

end