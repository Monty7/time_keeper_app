class ChangeTableNameToUserTimes < ActiveRecord::Migration[5.2]
  def change
    rename_table :times, :user_times
  end
end
