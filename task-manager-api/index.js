// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 3005;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Routes
// const taskRoutes = require("./routes/tasks");
// app.use("/tasks", taskRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3005; // Define the port for the server to run on

// Middleware
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { // Connect to MongoDB using the URI from environment variables
  useNewUrlParser: true, // Use new URL parser
  useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); // Log MongoDB connection errors
db.once("open", () => {
  console.log("Connected to MongoDB"); // Log successful MongoDB connection
});

// Routes
const taskRoutes = require("./routes/tasks"); // Import routes for tasks
app.use("/tasks", taskRoutes); // Use task routes with base path '/tasks'

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log server start and port
});
