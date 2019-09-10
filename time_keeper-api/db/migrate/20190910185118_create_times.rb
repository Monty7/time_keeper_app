class CreateTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :times do |t|
      t.datetime :clock_in
      t.datetime :clock_out
      t.string :month
      t.integer :date
      t.integer :month_time
    end
  end
end
