class AddContent < ActiveRecord::Migration
  def change
  	create_table :abouts do |t|
    	t.text :content, null:false
    end
  end
end
