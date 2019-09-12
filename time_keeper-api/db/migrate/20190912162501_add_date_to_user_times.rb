class AddDateToUserTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :user_times, :date_of_times, :integer
  end
end
