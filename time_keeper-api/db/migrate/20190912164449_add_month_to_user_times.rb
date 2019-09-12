class AddMonthToUserTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :user_times, :month_of_times, :integer
  end
end
