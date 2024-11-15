# DEVELOPMENT

## REQUIREMENTS

- **Input**

  Create an API endpoint that will receive a POST request with the following JSON body:

```json
{
  "topic": "sales",
  "description": "I need help with the pricing of the enterprise plan"
}
```

- **Output**

  If the topic is `sales`, send a message to a Slack channel.
  If the topic is `pricing`, send an email.

- **Scalability**

  The system should be able to handle more topics and channels in the future.

## CONSTRAINS

- Use TypeScript/Node.js for backend development (based on my expertise).
- Dockerize the app for deployment.

## PLAN

- Use Express.js for API handling.
- Choose Slack for implementation and mock email integration.

1. Create a Node.js project with Express.js
