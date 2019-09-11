class AddUserIdToUserTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :user_times, :user_id, :integer
  end
end
