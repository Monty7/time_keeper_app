class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :user_times
end
