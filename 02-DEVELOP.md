# DEVELOPMENT

## REQUIREMENTS

- **Input**

  Create an API endpoint that will receive a POST request with the following JSON body:

```json
{
  "topic": "slack",
  "description": "I need help with the pricing of the enterprise plan"
}
```

- **Output**

  If the topic is `slack`, send a message to a Slack channel.
  If the topic is `email`, send an email.

- **Scalability**

  The system should be able to handle more topics and channels in the future.

## CONSTRAINS

- Use TypeScript/Node.js for backend development (based on my expertise).
- Dockerize the app for deployment.

## THE PLAN

- Use Express.js for API handling.
- Choose Slack for implementation and mock email integration.

![alt text](a-team-plan.gif)

### STEPS

- Create a Node.js project with Express.js
- Create a tokenized API to minimize DOS attacks and unauthorized access
- Add CORS, body-parser and JWT middleware
- Add test framework Vitest & supertest for unit and integration tests
- Create an endpoint for making the notification
- Implement the logic to send messages to Slack or email based on the topic
- Dockerize the app

### Directories

```shell
landbot-backend-challenge/
├── src/            # Main application source code
│ ├── config.ts     # Centralized configuration based on process.env (e.g., ports, base routes)
│ ├── middleware/   # Custom middlewares
│ ├── routes/       # API and authentication route definitions
│ ├── controllers/  # Controllers handling route logic
│ ├── services/     # Business logic and data connections
│ ├── data/         # Data management, repositories (mock, databases, or models)
│ ├── utils/        # Reusable utility functions
│ └── tests/        # Automated application tests
│ └── e2e/          # End-to-end tests
├── Dockerfile      # Docker configuration file

```

### Middlewares

- CORS is used to enable requests from other origins. I have left a comment indicating that, in production, it should be configured more restrictively.
- `express.json()` and `express.urlencoded()` handle the body data of requests in JSON and URL-encoded formats.
- A custom middleware `verifyToken` ensures that protected routes require a valid token.
- A custom middleware `notifyPayload` validates the request payload and normalizes it for processing.

### Routes

- `authRouter`: Manages routes related to authentication.
- `apiRouter`: Manages general API routes. These routes also require the payload to be validated and normalized, and for the request to have an authentication token.

### Services

- The `services` directory contains the logic for handling messages based on the reference channel.
  In this case, a notification service is implemented that sends messages to Slack or Email based on the topic, and a factory is used for creating other channels, making it extensible and modular.
