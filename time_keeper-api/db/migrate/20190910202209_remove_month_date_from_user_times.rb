class RemoveMonthDateFromUserTimes < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_times, :month, :string
    remove_column :user_times, :date, :string
  end
end
