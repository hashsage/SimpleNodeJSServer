const http = require('http');
const os = require('os');

//generate a random delay
const randomDelay = () => Math.floor(Math.random() * 1000) + 500;

//handle incoming requests
const handleRequest = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  //If it's a preflight request, respond and end
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  //Simulating some asynchronous operation with a random delay
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const userInfo = {
      cpu: os.cpus(),
      platform: os.platform(),
      memory: os.totalmem()
    };
    res.end(JSON.stringify(userInfo));
  }, randomDelay());
};

//Create the HTTP server
const server = http.createServer(handleRequest);

//Set the port and start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
