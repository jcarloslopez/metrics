require 'faker'

400.times do
  Metric.create(
    name: "leads_inbound",
    value: Faker::Number.between(from: 1, to: 100),
    timestamp: Faker::Time.between(from: 2.week.ago, to: Time.now)
  )
end