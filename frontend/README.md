# Metrics dashboard

A frontend SPA application that allows you to post and visualise metrics.

## Features

- List all available metrics
- Add a new metric
- Render a chart showing a metric averages per period (minute/hour/day)
- Filter through the period, from and to dates

## Technologies

- Typescript
- React
- React router
- Custom CSS
- ApexCharts
- React testing library

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project structure

Inside the `src` you can find an `index.tsx` that describes the route structure of the application:

```
/                              -> App
  metrics/:name             -> Metric
  metrics/new                -> Metrics:New
```

The `App` route works as a wrapper of the whole application that renders the sidebar with a list of available metrics and a create metric button that shows the `MetricsNew` form route and the `Metric` route when a metric is selected where you can find a chart with the average values per day/hour/minute within a time interval as selected in the filter. When a error is thrown a `Error` route gets called which renders an info page with the error and some friendly texts.

All of this works on the clientside with a browser router that requests from the backend's json api.

## Available Scripts

In the project directory, you can run:

### `npm start`

Even though this project is run from docker you can also runs the app as standalone in the development mode if wanted.\
Open [http://localhost](http://localhost) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
