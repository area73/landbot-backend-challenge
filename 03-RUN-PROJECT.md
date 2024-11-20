# How to Run the Project

To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Install the dependencies with the command `npm install`.
4. Create a `.env` file in the root of the project and add the following environment variables:

- PORT
- SLACK_BOT_TOKEN
- SLACK_CHANNEL_ID

**WARNING** , need to have a valid SLACK_BOT_TOKEN and SLACK_CHANNEL_ID to run the project.

5. Run the command `npm start` to start the server.
6. Open your browser and navigate to `http://localhost:3000` to test the API.

## TEST

If you want to run the **unit tests**, use the command
`npm run test:unit`.

To run the **e2e tests**, use the command `npm run test:e2e`.

## COVERAGE

To get the test coverage, use the command `npm run coverage`.

## LINT

To run the linter, use the command `npm run lint`.
You can automatically fix the issues with the command `npm run lint:fix`.

## FORMAT

To format the code, use the command `npm run format`.

You can check if the code is correctly formatted with the command `npm run format:check`.

## DOCKER

To run the application in a Docker container, follow these steps:

1. Build the Docker image with the command `docker build -t landbot-backend-challenge .`.
2. Run the container with the command `docker run --env-file .env -p 3000:3000 landbot-backend-challenge`.

The application will be available at `http://localhost:3000`.

## Endpoints

### POST /auth/login

This endpoint receives a POST request with the following JSON body:

```json
{
  "username": "admin",
  "password": "HASH-123456"
}
```

and returns a JWT token, which we will need to use later in the API call.

### POST /api/v1/notify

This endpoint receives a POST request with the following JSON body:

```json
{
  "topic": "slack",
  "description": "I need help with the pricing of the enterprise plan"
}
```

- **Output**

  If the topic is `slack`, a message is sent to a Slack channel.
  If the topic is `email`, an email is sent.

- To make it work correctly, the environment variables `SLACK_BOT_TOKEN` and `SLACK_CHANNEL_ID` need to be configured in the `.env` file.
