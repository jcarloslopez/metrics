# Metrics Project

A Frontend + Backend application that allows you to post and visualise
metrics. Each metric will have: Timestamp, name, and value. The metrics will be shown
in a timeline and must show averages per minute/hour/day The metrics will be persisted
in the database.

This project uses docker compose to bootstrap a postgresql database, the rails backend and the react frontend in three containers. Once deployed the development can be done from the outside with sync as both projects are using outside folders with volumes established. Commands can be launched from the outside or from the inside, but some(gemfile modifications, migrations) require a new build.

## Getting started

Clone this repo and enter the directory

`$ git clone git@github.com:jcarloslopez/metrics.git && cd metrics`

Now we need to install the dependencies from both code containers. Even though this command looks like it will only install the frontend ones it will also install the backend ones because the frontend container has a depends_on configuration enabled on the backend:

`$ docker-compose run frontend npm install`

And now we need to create our database tables and populate them with some data

`$ docker-compose run backend bin/rails db:create db:migrate db:seed`

Finally we only need to deploy our containers

`$ docker-compose up`

Everything is setup and ready to play. You can now go to [localhost](http://localhost) to see the frontend or you can check the api on [localhost:3000](http://localhost:3000)
Because we populated the database with some data you should be able to see a metric on the sidebar. Clicking it will show you the average values chart for you to start playing with the filters or adding a new metric on the sidebar!

## Credits

This project was bootstraped following the official [docker compose documentation samples](https://github.com/docker/awesome-compose/tree/master/official-documentation-samples/rails)
