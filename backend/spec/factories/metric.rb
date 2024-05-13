FactoryBot.define do
  factory :metric do
    name { "test" }
    value { Faker::Number.between(from: 1, to: 100) }
    timestamp { Faker::Time.between(from: 1.week.ago, to: Time.now) }
  end
end