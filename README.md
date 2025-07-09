# 🧠 CollabBoard – Real-Time Collaborative To-Do App

**CollabBoard** is a MERN stack application that allows multiple users to collaborate on task management in real-time. With real-time drag-and-drop sync, smart task assignment, conflict resolution, and role-based permissions, this project simulates a real-world collaborative workflow environment.

---

## 🔧 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Frontend    | React + Vite             |
| Backend     | Node.js + Express        |
| Database    | MongoDB (with Mongoose)  |
| Real-Time   | Socket.IO                |
| Auth        | JWT + Cookie-based Auth  |
| Styling     | CSS (custom inline + Tailwind-ready) |
| Utils       | React Toastify, Hello-Pangea DnD |

---

## 🚀 Live Link and Demo

- 🔗 **Live App:** https://collabboard-frontend-lr6i.vercel.app/  
- 📹 **Demo Video:** https://drive.google.com/file/d/1Xz0xM0ghdcLEAuQeqHSpO5crkJCV-L4c/view?usp=drivesdk

---

## 📦 Features

1. **JWT Authentication**
   - Secure login and registration with cookie-based sessions.

2. **Protected Dashboard**
   - Redirects unauthenticated users to login.

3. **Drag-and-Drop Task Board**
   - Users can move tasks across Todo, In Progress, and Done columns.

4. **Real-Time Sync (Socket.IO)**
   - Task updates are broadcast live across all clients.

5. **Smart Task Assignment**
   - New tasks are automatically assigned to the user with the fewest incomplete tasks (Shortest Job First rule).

6. **Conflict Handling**
   - Prevents simultaneous edits by comparing timestamps and returning latest server copy on mismatch.

7. **Role-Based Permissions**
   - `admin`: Can delete any task and view logs.
   - `user`: Can manage their own tasks only.

8. **Activity Logging**
   - Every task creation, update, or deletion is logged with who did what and when.

9. **Toast Notifications**
   - Feedback for task events and sync alerts.

---

## 📁 Folder Structure

├── backend/
│ ├── app.js
│ ├── models/
│ ├── middleware/
│ ├── routes/
├── to-do/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── AuthContext.jsx
│ │ ├── socket.js
│ │ └── App.jsx


## 🧠 Smart Assign (Shortest Job First)

When a new task is added, the backend finds the user with the **least number of tasks in `Todo` or `In Progress` status**:

```js
const users = await userData.find();
let leastBusy = users[0];

for (const user of users) {
  const taskCount = await taskData.countDocuments({
    assignedTo: user.email,
    status: { $ne: 'Done' },
  });
  if (taskCount < leastBusy.taskCount) leastBusy = user;
```
conflict handling 
```
if (new Date(clientTimestamp) !== new Date(server.lastUpdated)) {
  return res.status(409).json({
    success: false,
    message: 'Conflict detected',
    serverTask: server,
  });
```

}

How to Run Locally
🔹 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/collabboard.git
cd collabboard
🔹 2. Setup Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
MongoDB must be running at mongodb://localhost:27017/to-do-db

You can use MongoDB Compass to view users and tasks

🔹 3. Setup Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs React app on: http://localhost:5173

🔹 4. Make an Admin User (Manual)
Open MongoDB Compass

Navigate to the users collection

Edit the desired user document:

json
Copy
Edit
{
  "role": "admin"
}
📮 API Endpoints
Method	Endpoint	Access	Description
POST	/register-api	Public	Register a new user
POST	/login	Public	Log in existing user
GET	/logout-api	Authenticated	Logout user
GET	/task-api	Authenticated	Get tasks assigned to a user
POST	/api/tasks	Authenticated	Add new task (auto-assign)
PUT	/tasks/:id	Authenticated	Update task with conflict check
DELETE	/tasks/:id	Admin only	Delete a task
GET	/logs	Admin only	View action logs
