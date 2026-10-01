const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 10000;

// 1. Enable cors for EVERYTHING explicitly using the validated library
server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept, Origin'
}));

// 2. Load the standard json-server defaults
server.use(middlewares);

// 3. Attach the router
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
