const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Path to your json database
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 10000; // Render provides the PORT dynamically

server.use(cors());
server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
