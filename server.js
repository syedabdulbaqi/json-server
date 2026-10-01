const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// 1. Force defaults to disable its basic CORS implementation
const middlewares = jsonServer.defaults({ noCors: true }); 

const port = process.env.PORT || 10000;

// 2. HARD-CODED CORS INTERCEPTOR (Must be at the absolute top)
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allows all frontends
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    // Crucial step: Handle the browser's preflight check instantly
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); 
    }
    next();
});

// 3. Load regular middlewares and routers below it
server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
