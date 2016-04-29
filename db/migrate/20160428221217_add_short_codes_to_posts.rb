class AddShortCodesToPosts < ActiveRecord::Migration
  def change
  	  add_column(:posts, :shortcode, :string)
  end
end
