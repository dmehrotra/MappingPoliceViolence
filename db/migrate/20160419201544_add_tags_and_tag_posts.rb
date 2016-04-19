class AddTagsAndTagPosts < ActiveRecord::Migration
  def change
 	create_table :tags do |t|
 		t.string :name, null:false 
 	end
 	create_table :tag_posts do |t|
 		t.integer :tag_id, null:false 
 		t.integer :post_id, null:false 
 	end
  end
end
