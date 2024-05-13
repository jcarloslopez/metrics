# Metrics api

A backend API application that allows you to read and create metrics

## API schema

- **/api/metrics**

  - GET: Lists all available metrics by name
  - POST: Creates a new metric

- **api/metrics/:name/averages**
  - GET: Returns metrics value averages grouped by the period requested
    - query options:
      - period: day | hour | minute
      - from: starting date (e.g "2022-10-01")
      - to: ending date (e.g "2022-10-01")

## Technologies

- RoR
- Postgresql
- Rspec

## Available Scripts

In the project directory, you can run:

### `rails s`

Even though this project is run from docker you can also runs the app as standalone in the development mode if wanted.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `rails db:seed`

Seed the database with some metric entries to get started

### `rspec`

Runs the test suite. `Byebug` is also installed which helps you debug the test suite by adding the command as a breakpoint in any line you need.
