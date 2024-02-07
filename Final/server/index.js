// express.js

const path = require('path');
const express = require('express');
require('dotenv').config();
const UsersController = require('./controllers/UsersController');
const WorkoutsController = require('./controllers/WorkoutsController');
const { parseAuthorizationToken, requireUser } = require('./middleware/authorization');
const app = express();

const PORT = process.env.PORT ?? 3000;

console.log(`The best class at SUNY New Paltz is ${process.env.BEST_CLASS}`);

app
  .use("/", express.static(path.join(__dirname, "../client/dist/")))
  .use(express.json())
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");  // Adjust if your client is on a different URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
      return res.status(200).send({});
    }
    next();
  })

  .use("/api/v1/workouts", WorkoutsController)


  .use("/api/v1/UsersController", UsersController)

  .get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

app.use((err, req, res, next) => {
  console.error(err);
  const msg = {
    status: err.code || 500,
    error: err.message  || "Internal Server Error",
    isSuccess: false,
  };
  res.status(msg.status).json(msg);
});

console.log('1: Trying to start server...');

app.listen(PORT, () => {
    console.log(`2: Server is running at http://localhost:${PORT}`);
});

console.log('3: End of file, waiting for requests...');
