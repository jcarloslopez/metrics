FROM ruby:3.0.2
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir -p /myapp/backend
WORKDIR /myapp/backend
COPY Gemfile /myapp/backend/Gemfile
COPY Gemfile.lock /myapp/backend/Gemfile.lock
RUN bundle install
COPY . /myapp/backend

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]