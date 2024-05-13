class Metric < ApplicationRecord
  validates :name, :value, :timestamp, presence: true
end
