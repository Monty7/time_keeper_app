class RemoveNameFromUserTime < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_times, :name, :string
  end
end
