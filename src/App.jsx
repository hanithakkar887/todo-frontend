
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; 
const API_URL = "https://todo-backend-6-mgan.onrender.com";
const COLORS = ["#ff6347", "#4caf50"]; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    status: false,
    priority: "Medium",
  });
  const [editTask, setEditTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Change this to set how many tasks per page

  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async () => {
    if (!newTask.title.trim() || !newTask.desc.trim()) {
      toast.error("Title and Description are required!");
      return;
    }
    try {
      await axios.post(`${API_URL}/tasks`, newTask);
      setNewTask({ title: "", desc: "", status: false, priority: "Medium" });
      toast.success("Task added successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    if (!updatedTask.title.trim() || !updatedTask.desc.trim()) {
      toast.error("Title and Description are required!");
      return;
    }
    try {
      await axios.patch(`${API_URL}/tasks/${id}`, updatedTask);
      setEditTask(null);
      toast.info("Task updated successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      toast.warning("Task deleted!");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      await axios.patch(`${API_URL}/tasks/${task._id}`, {
        title: task.title,
        desc: task.desc,
        status: !task.status,
        priority: task.priority,
      });
      toast.success(task.status ? "Task marked as pending!" : "Task completed!");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const pendingTasks = tasks.filter((task) => !task.status).length;
  const completedTasks = tasks.filter((task) => task.status).length;

  // Data for Pie Chart
  const pieData = [
    { name: "Pending", value: pendingTasks },
    { name: "Completed", value: completedTasks },
  ];


  const filteredTasks = tasks
    .filter((task) => filterPriority === "All" || task.priority === filterPriority)
    .sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const displayedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h2>To-Do App</h2>
      <h4>Pending Tasks: {pendingTasks}</h4>
      <h4>Completed Tasks: {completedTasks}</h4>

      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.desc}
        onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
      />
      <select
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={createTask}>Add Task</button>

      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <ul>
        {displayedTasks.map((task) => (
          <li key={task._id}>
            <div style={{ textDecoration: task.status ? "line-through" : "none" }}>
              <strong style={{ textDecoration: task.status ? "line-through" : "none" }}>Title:</strong> {task.title} <br />
              <strong style={{ textDecoration: task.status ? "line-through" : "none" }}>Description:</strong> {task.desc} <br />
              <strong >Status:</strong> {task.status ? "✅ Completed" : "❌ Pending"} <br />
              <strong>Priority:</strong> {task.priority}
            </div>
            <div>
              <button onClick={() => toggleTaskStatus(task)}>
                {task.status ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
              <button onClick={() => setEditTask(task)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px",display:"flex" ,justifyContent:"space-between"}}>
        <button  style={{width:"35%"}}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span style={{ margin: "auto"}}>
          Page {currentPage} of {totalPages}
        </span>
        <button  style={{width:"35%"}}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {editTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            />
            <input
              type="text"
              value={editTask.desc}
              onChange={(e) => setEditTask({ ...editTask, desc: e.target.value })}
            />
            <select
              value={editTask.priority}
              onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={() => updateTask(editTask._id, editTask)}>Save</button>
            <button onClick={() => setEditTask(null)}>Cancel</button>
          </div>

          <div>
          <PieChart width={300} height={300}>
       <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{color: "white", borderRadius: "5px" }} />
        {/* <Tooltip /> */}
        <Legend />
      </PieChart>
          </div>
          
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;





// import "./App.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Import Recharts

// const API_URL = "https://todo-backend-6-mgan.onrender.com";

// const COLORS = ["#ff6347", "#4caf50"]; // Colors for Pending (Red) & Completed (Green)

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     desc: "",
//     status: false,
//     priority: "Medium",
//   });
//   const [editTask, setEditTask] = useState(null);
//   const [filterPriority, setFilterPriority] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const tasksPerPage = 5;

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/tasks`);
//       setTasks(res.data.tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const pendingTasks = tasks.filter((task) => !task.status).length;
//   const completedTasks = tasks.filter((task) => task.status).length;

//   // Data for Pie Chart
//   const pieData = [
//     { name: "Pending", value: pendingTasks },
//     { name: "Completed", value: completedTasks },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>To-Do App</h2>

//       {/* Pie Chart Section */}
//       <PieChart width={300} height={300}>
//         <Pie
//           data={pieData}
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//           label
//         >
//           {pieData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>

//       <h4>Pending Tasks: {pendingTasks}</h4>
//       <h4>Completed Tasks: {completedTasks}</h4>

//       <ToastContainer />
//     </div>
//   );
// }

// export default App;

