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

## THE PLAN

- Use Express.js for API handling.
- Choose Slack for implementation and mock email integration.

## STEPS

- Create a Node.js project with Express.js
- Add CORS middleware for cross-origin requests.
- Add body-parser middleware for JSON body parsing.
- Add JWT middleware for authentication.
  **JSON web token(JWT)** is a JSON Object which is used to securely transfer information over the web(between two parties). It is generally used for authentication systems and can also be used for information exchange.

2. Create a POST endpoint to receive the JSON body.

3. Implement the logic to send messages to Slack or email based on the topic.

4. Dockerize the app.
