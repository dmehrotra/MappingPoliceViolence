class CreatePostsTable < ActiveRecord::Migration
  def change
    create_table :posts do |t|
    	t.string :title, null:false
    	t.string :image
    	t.boolean :featured, default:false
    end
  end
end
