# Node JS Learn API

Express and TypeScript API for user profiles, meals, meal plans, dashboards,
and administration.

## API documentation

Start the development server:

```bash
yarn dev
```

Then open:

- Swagger UI: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- OpenAPI JSON: [http://localhost:5000/api-docs.json](http://localhost:5000/api-docs.json)

The OpenAPI document describes all public, user, and administrator endpoints,
including JSON schemas and raw binary image uploads.

### Authentication

Protected routes currently read Supabase tokens from cookies named
`accessToken` and `refreshToken`. Login and refresh responses return these
tokens in JSON; the API does not set the cookies itself. A client must persist
the returned values as cookies before calling protected routes.

Browsers do not allow Swagger UI to set arbitrary `Cookie` headers. To try
protected endpoints, set the cookies for `localhost` through your client or
browser first, then send the request with credentials.
