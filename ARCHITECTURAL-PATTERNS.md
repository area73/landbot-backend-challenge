# Architectural Patterns Used

## Layered Architecture Pattern:

Description: The application is organized into separate layers, improving the separation of concerns.

**Evidence:**

- `routes` is responsible for defining the API routes.
- `controllers`: handles the logic of the requests.
- `services`: handles the business logic or interaction with data (in `data`).
- `middleware`: intercepts requests for validation or checks.

**Advantages:**

- Facilitates scalability by keeping each layer independent.
- Makes unit testing easier for each component.

## Modular Pattern

Description: The components of the system are separated into specific modules (e.g., `authRouter`, `apiRouter`).

**Evidence:**

- Use of specific routers to group routes (`authRouter` and `apiRouter`).
- Modularity extends to custom middlewares like `verifyToken`.

**Advantages:**

- Helps maintain the code organized and easily extendable.
- New modules can be added without affecting other components.

## Middleware Pattern

Description: Middleware is used to process requests and responses in the application.

**Evidence:**

- Use of middlewares like `express.json()` to parse data.
- `verifyToken` is a custom middleware to verify authentication tokens.

**Advantages:**

- Simplifies the implementation of cross-cutting functionalities such as authentication, logging, and error handling.

## Centralized Configuration Pattern:

Description: The configuration (e.g., ports, route entry points, secrets) is centralized in a single file (`config.ts`), which in turn reads from a `.env` file.

Storing configuration in the environment separate from code is based on The [Twelve-Factor App methodology](https://12factor.net/config).

**Advantages:**

- Facilitates configuration changes without modifying the codebase.
- Allows differentiation between development, testing, and production configurations.
- Improves security by not exposing secrets in the source code.

## Single Entry Point Pattern:

Description: All the initial logic of the application is centralized in `app.ts` and `server.ts`.

**Evidence:**

- `app.ts` configures middlewares and routes.
- `server.ts` starts the server using the configured application.

**Advantages:**

- Facilitates the separation between configuration logic (`app`) and execution logic (`server`).

## Route Guard Pattern:

Description: Protected routes require token verification before they are accessible.

**Evidence:**

- `verifyToken` middleware is applied to all routes after the `authEntryPoint`.

**Advantages:**

- Enhances security by controlling access to protected resources.
- Ensures that only authenticated users can access certain routes.
