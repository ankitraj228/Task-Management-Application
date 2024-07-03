
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css"; // Ensure you import your CSS file

// const Todo = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [showNew, setShowNew] = useState(true);
//   const [showDelete, setShowDelete] = useState(true);
//   const [toggleSubmit, setToggleSubmit] = useState(true);
//   const [isEditItem, setIsEditItem] = useState(null);
//   const [showList, setShowList] = useState(true);
//   const [deleteMessage, setDeleteMessage] = useState(false);

//   const [inputTitle, setInputTitle] = useState("");
//   const [inputDesc, setInputDesc] = useState("");
//   const [inputDate, setInputDate] = useState("");
//   const [expandedTask, setExpandedTask] = useState(null);
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null); // State for handling errors

//   const apiUrl = process.env.REACT_APP_API_URL;

//   // Fetch tasks from backend
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/tasks`);
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setError("Error fetching tasks. Please try again later.");
//       }
//     };
//     fetchTasks();
//   }, [apiUrl]);

//   // HANDLING INPUT FIELDS
//   const handleInput = (e) => {
//     setInputTitle(e.target.value);
//   };
//   const handleInputdesc = (e) => {
//     setInputDesc(e.target.value);
//   };
//   const handleInputDate = (e) => {
//     setInputDate(e.target.value);
//   };

//   // SUBMITTING FORM
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!inputTitle || !inputDesc || !inputDate) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const newTask = {
//       title: inputTitle,
//       description: inputDesc,
//       date: inputDate,
//     };

//     if (toggleSubmit) {
//       // Create new task
//       try {
//         const response = await axios.post(`${apiUrl}/tasks`, newTask);
//         setItems([response.data, ...items]);
//       } catch (error) {
//         console.error("Error creating task:", error);
//         setError("Error creating task. Please try again later.");
//       }
//     } else {
//       // Update existing task
//       try {
//         const response = await axios.patch(`${apiUrl}/tasks/${isEditItem}`, newTask);
//         setItems(items.map((item) => (item._id === isEditItem ? response.data : item)));
//       } catch (error) {
//         console.error("Error updating task:", error);
//         setError("Error updating task. Please try again later.");
//       }
//       setToggleSubmit(true);
//       setShowForm(false);
//       setShowDelete(true);
//     }

//     setInputTitle("");
//     setInputDesc("");
//     setInputDate("");
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     console.log(`Attempting to delete task with ID: ${id}`);
//     try {
//       const response = await axios.delete(`${apiUrl}/tasks/${id}`);
//       console.log('Delete response:', response);
//       setItems(items.filter((item) => item._id !== id));
//       setDeleteMessage(true);
//       setTimeout(() => {
//         setDeleteMessage(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       setError("Error deleting task. Please try again later.");
//     }
//   };

//   // EDIT
//   const handleEdit = (id) => {
//     const taskToEdit = items.find((item) => item._id === id);
//     setInputTitle(taskToEdit.title);
//     setInputDesc(taskToEdit.description);
//     setInputDate(taskToEdit.date);
//     setIsEditItem(id);
//     setToggleSubmit(false);
//     setShowForm(true);
//     setShowNew(false);
//     setShowList(false);
//     setShowDelete(false);
//   };

//   // ADD NEW TASK
//   const handleAdd = () => {
//     setInputTitle("");
//     setInputDesc("");
//     setInputDate("");
//     setToggleSubmit(true);
//     setShowForm(true);
//     setShowList(true);
//     setShowNew(false);
//   };

//   // TOGGLE EXPANDED TASK
//   const handleToggleExpand = (id) => {
//     setExpandedTask((prevId) => (prevId === id ? null : id));
//   };

//   return (
//     <div className="container">
//       <h1 className="text-3xl font-bold my-4">Task Management Application</h1>
//       {showNew && (
//         <div className="button-container">
//           <button className="btn btn-primary" onClick={handleAdd}>
//            Add New Task
//           </button>
//         </div>
//       )}

//       {showForm && (
//         <div className="form-container">
//           <div>
//             <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="title">Enter Title</label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               placeholder="Title"
//               onChange={handleInput}
//               value={inputTitle}
//             />
//             <label htmlFor="description">Enter Description</label>
//             <input
//               type="text"
//               name="description"
//               id="description"
//               placeholder="Description"
//               onChange={handleInputdesc}
//               value={inputDesc}
//             />
//             <label htmlFor="date">Enter Date</label>
//             <input
//               type="date"
//               name="date"
//               id="date"
//               onChange={handleInputDate}
//               value={inputDate}
//             />
//             {toggleSubmit ? (
//               <button className="btn btn-primary">Save</button>
//             ) : (
//               <button className="btn btn-primary">Update</button>
//             )}
//           </form>
//         </div>
//       )}

//       {showList && (
//         <div className="task-list">
//           {deleteMessage && <p className="message success">Item Deleted Successfully</p>}
//           {error && <p className="message error">{error}</p>}
//           {items.map((elem) => {
//             const isExpanded = expandedTask === elem._id;
//             return (
//               <div
//                 className={`task-item ${isExpanded ? "expanded" : ""}`}
//                 key={elem._id}
//                 onClick={() => handleToggleExpand(elem._id)}
//               >
//                 <div>
//                   <h4>{elem.title}</h4>
//                   <p>{new Date(elem.date).toLocaleDateString()}</p>
//                   {isExpanded && <p>{elem.description}</p>}
//                 </div>
//                 <div className="btn-container">
//                   <button
//                     className="btn btn-primary"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEdit(elem._id);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   {showDelete && (
//                     <button
//                       className="btn btn-danger"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(elem._id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Todo;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Ensure you import your CSS file

const Todo = () => {
  // State variables
  const [showForm, setShowForm] = useState(false);
  const [showNew, setShowNew] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [showList, setShowList] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(false);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  const apiUrl = process.env.REACT_APP_API_URL; // API URL from environment variables

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks`); // Fetch tasks from API
        setItems(response.data); // Update tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks. Please try again later."); // Handle error
      }
    };
    fetchTasks(); // Call fetchTasks function on component mount
  }, [apiUrl]); // Dependency array to ensure useEffect runs only when apiUrl changes

  // Handling input fields
  const handleInput = (e) => {
    setInputTitle(e.target.value); // Update inputTitle state based on user input
  };
  const handleInputdesc = (e) => {
    setInputDesc(e.target.value); // Update inputDesc state based on user input
  };
  const handleInputDate = (e) => {
    setInputDate(e.target.value); // Update inputDate state based on user input
  };

  // Submitting form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!inputTitle || !inputDesc || !inputDate) {
      alert("Please fill in all fields."); // Alert user if any field is empty
      return;
    }

    const newTask = {
      title: inputTitle,
      description: inputDesc,
      date: inputDate,
    };

    if (toggleSubmit) {
      // Create new task
      try {
        const response = await axios.post(`${apiUrl}/tasks`, newTask); // Send POST request to create new task
        setItems([response.data, ...items]); // Update tasks in state with new task
      } catch (error) {
        console.error("Error creating task:", error);
        setError("Error creating task. Please try again later."); // Handle error
      }
    } else {
      // Update existing task
      try {
        const response = await axios.patch(`${apiUrl}/tasks/${isEditItem}`, newTask); // Send PATCH request to update task
        setItems(items.map((item) => (item._id === isEditItem ? response.data : item))); // Update tasks in state
      } catch (error) {
        console.error("Error updating task:", error);
        setError("Error updating task. Please try again later."); // Handle error
      }
      setToggleSubmit(true); // Reset toggleSubmit state
      setShowForm(false); // Hide form
      setShowDelete(true); // Show delete button
    }

    // Clear input fields
    setInputTitle("");
    setInputDesc("");
    setInputDate("");
  };

  // Delete task
  const handleDelete = async (id) => {
    console.log(`Attempting to delete task with ID: ${id}`);
    try {
      const response = await axios.delete(`${apiUrl}/tasks/${id}`); // Send DELETE request to delete task
      console.log('Delete response:', response);
      setItems(items.filter((item) => item._id !== id)); // Update tasks in state, removing deleted task
      setDeleteMessage(true); // Show delete success message
      setTimeout(() => {
        setDeleteMessage(false); // Hide delete success message after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task. Please try again later."); // Handle error
    }
  };

  // Edit task
  const handleEdit = (id) => {
    const taskToEdit = items.find((item) => item._id === id); // Find task to edit based on ID
    setInputTitle(taskToEdit.title); // Populate input fields with task data
    setInputDesc(taskToEdit.description);
    setInputDate(taskToEdit.date);
    setIsEditItem(id); // Set isEditItem state to current task ID
    setToggleSubmit(false); // Set toggleSubmit state to false for update mode
    setShowForm(true); // Show form for editing
    setShowNew(false); // Hide 'Add New Task' button
    setShowList(false); // Hide task list
    setShowDelete(false); // Hide delete button
  };

  // Add new task
  const handleAdd = () => {
    setInputTitle(""); // Clear input fields
    setInputDesc("");
    setInputDate("");
    setToggleSubmit(true); // Set toggleSubmit state to true for add mode
    setShowForm(true); // Show form for adding new task
    setShowList(true); // Show task list
    setShowNew(false); // Hide 'Add New Task' button
  };

  // Toggle expanded task view
  const handleToggleExpand = (id) => {
    setExpandedTask((prevId) => (prevId === id ? null : id)); // Toggle expandedTask state based on ID
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold my-4">Task Management Application</h1>
      {showNew && (
        <div className="button-container">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add New Task
          </button>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <div>
            <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleInput}
              value={inputTitle}
            />
            <label htmlFor="description">Enter Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              onChange={handleInputdesc}
              value={inputDesc}
            />
            <label htmlFor="date">Enter Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleInputDate}
              value={inputDate}
            />
            {toggleSubmit ? (
              <button className="btn btn-primary">Save</button>
            ) : (
              <button className="btn btn-primary">Update</button>
            )}
          </form>
        </div>
      )}

      {showList && (
        <div className="task-list">
          {deleteMessage && <p className="message success">Item Deleted Successfully</p>}
          {error && <p className="message error">{error}</p>}
          {items.map((elem) => {
            const isExpanded = expandedTask === elem._id;
            return (
              <div
                className={`task-item ${isExpanded ? "expanded" : ""}`}
                key={elem._id}
                onClick={() => handleToggleExpand(elem._id)}
              >
                <div>
                  <h4>{elem.title}</h4>
                  <p>{new Date(elem.date).toLocaleDateString()}</p>
                  {isExpanded && <p>{elem.description}</p>}
                </div>
                <div className="btn-container">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(elem._id);
                    }}
                  >
                    Edit
                  </button>
                  {showDelete && (
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(elem._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Todo;
