// import './App.css'
// import { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "https://todo-backend-6-mgan.onrender.com";

// function App() {
//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState({ title: "", desc: "", status: false });
//     const [editTask, setEditTask] = useState(null);

    
//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/read`);
//             setTasks(res.data.tasks);
//         } catch (error) {
//             console.error("Error fetching tasks:", error);
//         }
//     };

//     const createTask = async () => {
//         try {
//             await axios.post(`${API_URL}/create`, newTask);
//             setNewTask({ title: "", desc: "", status: false });
//             fetchTasks();
//         } catch (error) {
//             console.error("Error creating task:", error);
//         }
//     };

//     const updateTask = async (id, updatedTask) => {
//         try {
//             await axios.patch(`${API_URL}/tasks/${id}`, updatedTask);
//             setEditTask(null);
//             fetchTasks();
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//     };

//     const deleteTask = async (id) => {
//         try {
//             await axios.delete(`${API_URL}/tasks/${id}`);
//             fetchTasks();
//         } catch (error) {
//             console.error("Error deleting task:", error);
//         }
//     };

//     // 
//     const pendingTasks = tasks.filter(task => !task.status).length;
//     const completedTask=tasks.filter(task=>task.status).length
//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>To-Do App</h2>
            
//             {/* Pending Count */}
//             <h4>Pending Tasks: {pendingTasks}</h4>
//             <h4>completed Tasks:{completedTask}</h4>

//             {/*  Form */}
//             <input
//                 type="text"
//                 placeholder="Title"
//                 value={newTask.title}
//                 onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={newTask.desc}
//                 onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
//             />
            
//             {/* <select
//                 value={newTask.status}
//                 onChange={(e) => setNewTask({ ...newTask, status: e.target.value === "true" })}
//             >
//                 <option value="false"> Pending</option>
//                 <option value="true"> Completed</option>
//             </select> */}

//             <button onClick={createTask}>Add Task</button>

//             {/* Task*/}
//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task._id}>
//                       <div style={{display:"flex"}}>
//                       <span 
//                             style={{
//                                 textDecoration: task.status ? "line-through" : "none",
//                                 marginRight: "10px", display:"flex" 
//                             }}
//                         >
//                             {task.title} - {task.desc}  
//                             <strong > [{task.status ? "Completed" : " Pending"}]</strong>
//                         </span>
//                       </div>
                        
//                         <div style={{display:"flex",justifyContent:"space-evenly", width:"50%", gap:'3px'}}>
//                         <button onClick={() => updateTask(task._id, { status: !task.status })}>
//                             {task.status ? "Undo" : "Complete"}
//                         </button>
//                         <button onClick={() => deleteTask(task._id)}>Delete</button>
//                         <button onClick={() => setEditTask(task)}>Edit</button>
//                         </div>
                        
//                     </li>
//                 ))}
//             </ul>

//             {/* Edit Task Modal */}
//             {editTask && (
//                 <div style={{ background: "white", padding: "20px", borderRadius: "5px", boxShadow: "0px 0px 10px gray", width: "300px", margin: "auto" }}>
//                     <h3>Edit Task</h3>
//                     <input
//                         type="text"
//                         value={editTask.title}
//                         onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         value={editTask.desc}
//                         onChange={(e) => setEditTask({ ...editTask, desc: e.target.value })}
//                     />
//                     {/* Status Dropdown in Edit Modal */}
//                     <select
//                         value={editTask.status}
//                         onChange={(e) => setEditTask({ ...editTask, status: e.target.value === "true" })}
//                     >
//                         <option value="false"> Pending</option>
//                         <option value="true"> Completed</option>
//                     </select>

//                     <button onClick={() => updateTask(editTask._id, { title: editTask.title, desc: editTask.desc, status: editTask.status })}>
//                         Save
//                     </button>
//                     <button onClick={() => setEditTask(null)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;




// import './App.css';
// import { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "https://todo-backend-6-mgan.onrender.com";

// function App() {
//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState({ title: "", desc: "", status: false, priority: "Medium" });
//     const [editTask, setEditTask] = useState(null);

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/read`);
//             setTasks(res.data.tasks);
//         } catch (error) {
//             console.error("Error fetching tasks:", error);
//         }
//     };

//     const createTask = async () => {
//         try {
//             await axios.post(`${API_URL}/create`, newTask);
//             setNewTask({ title: "", desc: "", status: false, priority: "Medium" });
//             fetchTasks();
//         } catch (error) {
//             console.error("Error creating task:", error);
//         }
//     };

//     const updateTask = async (id, updatedTask) => {
//         try {
//             await axios.patch(`${API_URL}/tasks/${id}`, updatedTask);
//             setEditTask(null);
//             fetchTasks();
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//     };

//     const deleteTask = async (id) => {
//         try {
//             await axios.delete(`${API_URL}/tasks/${id}`);
//             fetchTasks();
//         } catch (error) {
//             console.error("Error deleting task:", error);
//         }
//     };

//     const pendingTasks = tasks.filter(task => !task.status).length;
//     const completedTasks = tasks.filter(task => task.status).length;

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>To-Do App</h2>
//             <h4>Pending Tasks: {pendingTasks}</h4>
//             <h4>Completed Tasks: {completedTasks}</h4>

//             <input
//                 type="text"
//                 placeholder="Title"
//                 value={newTask.title}
//                 onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={newTask.desc}
//                 onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
//             />
//             <select
//                 value={newTask.priority}
//                 onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//             >
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//             </select>
//             <button onClick={createTask}>Add Task</button>

//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task._id}>
//                         <div style={{ display: "flex" }}>
//                             <span
//                                 style={{
//                                     textDecoration: task.status ? "line-through" : "none",
//                                     marginRight: "10px",
//                                     display: "flex"
//                                 }}
//                             >
//                                 {task.title} - {task.desc} 
//                                 <strong> [{task.status ? "Completed" : "Pending"}]</strong>
//                                 {/* <strong> (Priority: {task.priority})</strong> */}
//                             </span>
//                         </div>
//                         <div style={{ display: "flex", justifyContent: "space-evenly", width: "50%", gap: '3px' }}>
//                             <button onClick={() => updateTask(task._id, { status: !task.status })}>
//                                 {task.status ? "Undo" : "Complete"}
//                             </button>
//                             <button onClick={() => deleteTask(task._id)}>Delete</button>
//                             <button onClick={() => setEditTask(task)}>Edit</button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>

//             {editTask && (
//                 <div style={{ background: "white", padding: "20px", borderRadius: "5px", boxShadow: "0px 0px 10px gray", width: "300px", margin: "auto" }}>
//                     <h3>Edit Task</h3>
//                     <input
//                         type="text"
//                         value={editTask.title}
//                         onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         value={editTask.desc}
//                         onChange={(e) => setEditTask({ ...editTask, desc: e.target.value })}
//                     />
//                     <select
//                         value={editTask.status}
//                         onChange={(e) => setEditTask({ ...editTask, status: e.target.value === "true" })}
//                     >
//                         <option value="false">Pending</option>
//                         <option value="true">Completed</option>
//                     </select>
//                     <select
//                         value={editTask.priority}
//                         onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
//                     >
//                         <option value="High">High</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Low">Low</option>
//                     </select>
//                     <button onClick={() => updateTask(editTask._id, { title: editTask.title, desc: editTask.desc, status: editTask.status, priority: editTask.priority })}>
//                         Save
//                     </button>
//                     <button onClick={() => setEditTask(null)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;


import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://todo-backend-6-mgan.onrender.com";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", desc: "", status: false, priority: "Medium" });
    const [editTask, setEditTask] = useState(null);

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
        try {
            await axios.post(`${API_URL}/tasks`, newTask);
            setNewTask({ title: "", desc: "", status: false, priority: "Medium" });
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            await axios.patch(`${API_URL}/tasks/${id}`, updatedTask);
            setEditTask(null);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
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
                priority: task.priority 
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const pendingTasks = tasks.filter(task => !task.status).length;
    const completedTasks = tasks.filter(task => task.status).length;

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

            <ul>
                {tasks.map((task) => (
                    <li key={task._id} 
                        style={{ 
                            borderBottom: "1px solid gray", 
                            padding: "10px 0" 
                        }}>
                        <div>
                            <strong>Title:</strong> 
                            <span style={{ textDecoration: task.status ? "line-through" : "none" }}>
                                {task.title}
                            </span> <br />
                            <strong>Description:</strong> 
                            <span style={{ textDecoration: task.status ? "line-through" : "none" }}>
                                {task.desc}
                            </span> <br />
                            <strong>Status:</strong> {task.status ? "✅ Completed" : "❌ Pending"} <br />
                            <strong>Priority:</strong> <span style={{ color: task.priority === "High" ? "red" : task.priority === "Medium" ? "orange" : "green" }}>
                                {task.priority}
                            </span>
                        </div>
                        <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
                            <button onClick={() => toggleTaskStatus(task)}>
                                {task.status ? "Undo" : "Complete"}
                            </button>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>
                            <button onClick={() => setEditTask(task)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editTask && (
                <div style={{ background: "white", padding: "20px", borderRadius: "5px", boxShadow: "0px 0px 10px gray", width: "300px", margin: "auto" }}>
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
                        value={editTask.status ? "true" : "false"}
                        onChange={(e) => setEditTask({ ...editTask, status: e.target.value === "true" })}
                    >
                        <option value="false">Pending</option>
                        <option value="true">Completed</option>
                    </select>
                    <select
                        value={editTask.priority}
                        onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <button onClick={() => updateTask(editTask._id, { title: editTask.title, desc: editTask.desc, status: editTask.status, priority: editTask.priority })}>
                        Save
                    </button>
                    <button onClick={() => setEditTask(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default App;
