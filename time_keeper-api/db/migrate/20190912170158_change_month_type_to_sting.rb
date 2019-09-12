class ChangeMonthTypeToSting < ActiveRecord::Migration[5.2]
  def change
    change_column :user_times, :month_of_times, :string
  end
end
