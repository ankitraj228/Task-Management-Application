
// const express = require("express");
// const router = express.Router();
// const Task = require("../Models/task");

// // Middleware to get task by ID
// async function getTask(req, res, next) {
//   let task;
//   try {
//     task = await Task.findById(req.params.id);
//     if (task == null) {
//       return res.status(404).json({ message: "Cannot find task" });
//     }
//   } catch (error) {
//     console.error("Error fetching task:", error);
//     return res.status(500).json({ message: error.message });
//   }

//   res.task = task;
//   next();
// }

// // Retrieve all tasks
// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new task
// router.post("/", async (req, res) => {
//   const task = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     date: new Date(req.body.date),
//   });

//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     console.error("Error creating task:", error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // Retrieve a single task by its ID
// router.get("/:id", getTask, (req, res) => {
//   res.json(res.task);
// });

// // Update an existing task
// router.patch("/:id", getTask, async (req, res) => {
//   if (req.body.title != null) {
//     res.task.title = req.body.title;
//   }
//   if (req.body.description != null) {
//     res.task.description = req.body.description;
//   }
//   if (req.body.date != null) {
//     res.task.date = new Date(req.body.date);
//   }
//   try {
//     const updatedTask = await res.task.save();
//     res.json(updatedTask);
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a task
// router.delete("/:id", getTask, async (req, res) => {
//   console.log(`Received delete request for task with ID: ${req.params.id}`);
//   try {
//     await res.task.deleteOne(); // Using deleteOne instead of remove
//     console.log(`Task with ID: ${req.params.id} deleted successfully`);
//     res.json({ message: "Deleted Task" });
//   } catch (error) {
//     console.error("Error deleting task:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Task = require("../Models/task");

// Middleware to get task by ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id); // Find task by ID
    if (task == null) {
      return res.status(404).json({ message: "Cannot find task" }); // If task not found, send 404
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ message: error.message }); // If error occurs, send 500
  }

  res.task = task; // Attach task to response object
  next(); // Move to the next middleware/route handler
}

// Retrieve all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.json(tasks); // Send tasks as JSON response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: error.message }); // If error occurs, send 500
  }
});

// Create a new task
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    date: new Date(req.body.date), // Convert date to Date object
  });

  try {
    const newTask = await task.save(); // Save new task
    res.status(201).json(newTask); // Send created task as JSON response with 201 status
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: error.message }); // If error occurs, send 400
  }
});

// Retrieve a single task by its ID
router.get("/:id", getTask, (req, res) => {
  res.json(res.task); // Send task as JSON response
});

// Update an existing task
router.patch("/:id", getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title; // Update title if provided
  }
  if (req.body.description != null) {
    res.task.description = req.body.description; // Update description if provided
  }
  if (req.body.date != null) {
    res.task.date = new Date(req.body.date); // Update date if provided
  }
  try {
    const updatedTask = await res.task.save(); // Save updated task
    res.json(updatedTask); // Send updated task as JSON response
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: error.message }); // If error occurs, send 400
  }
});

// Delete a task
router.delete("/:id", getTask, async (req, res) => {
  console.log(`Received delete request for task with ID: ${req.params.id}`);
  try {
    await res.task.deleteOne(); // Delete task
    console.log(`Task with ID: ${req.params.id} deleted successfully`);
    res.json({ message: "Deleted Task" }); // Send confirmation message
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: error.message }); // If error occurs, send 500
  }
});

module.exports = router;
