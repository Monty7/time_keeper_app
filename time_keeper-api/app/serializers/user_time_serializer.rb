class UserTimeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :clock_in, :clock_out, :user_id, :date_of_times
  belongs_to :user
end
