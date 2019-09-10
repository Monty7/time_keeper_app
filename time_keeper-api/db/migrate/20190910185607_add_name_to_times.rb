class AddNameToTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :times, :name, :string
  end
end
