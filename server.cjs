// server.cjs
const jsonServer = require('json-server');
const corsMiddleware = require('./cors-middleware.cjs');
const server = jsonServer.create();
const router1 = jsonServer.router('./public/data/properties.json');
const router2 = jsonServer.router('./public/data/estate-agents.json');
const middlewares = jsonServer.defaults();

// Apply CORS middleware
server.use(corsMiddleware);

// Use the middlewares
server.use(middlewares);

// Set up routers for different endpoints
server.use('/properties', router1);
server.use('/estate-agents', router2);

// Start the server
server.listen(4005, () => {
  console.log('JSON Server is running on port 4005');
});