# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.10.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .

RUN yarn install
# Build for production.
RUN yarn build

# Install `serve` to run the application.
RUN yarn global add serve

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 3000
