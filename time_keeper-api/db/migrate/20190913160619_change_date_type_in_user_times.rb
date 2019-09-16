class ChangeDateTypeInUserTimes < ActiveRecord::Migration[5.2]
  def change
    change_column :user_times, :date_of_times, :string
  end
end
