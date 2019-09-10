class CreateUserTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_times do |t|

      t.timestamps
    end
  end
end
