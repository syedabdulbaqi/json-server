const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// json-server's defaults ship their own cors() middleware. Disable it so that
// only the one below answers (two cors layers fight over the same headers).
const middlewares = jsonServer.defaults({ noCors: true });

const port = process.env.PORT || 10000;

// Single CORS setup. Handles the OPTIONS preflight, which the browser sends
// whenever a request carries Authorization / X-Tenant-ID.
server.use(
  cors({
    origin: true,        // reflect the caller's origin; '*' is rejected when credentials are sent
    credentials: true,   // matches withCredentials: true on apiClient
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders omitted on purpose: cors then echoes whatever the browser
    // asks for in Access-Control-Request-Headers (Authorization, X-Tenant-ID, ...)
  }),
);

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});