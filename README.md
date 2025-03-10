# Chat App 🎉🔥💬

This is a full-stack **real-time group chat application** built with **React (frontend)** and **Node.js with Express.js (backend)**. The app supports **user authentication, group creation, and real-time messaging** using **Socket.io**. 🚀💡💻

## 📁 Folder Structure 📂🗂️📜

```
.
├── backend            # Server-side code (Node.js, Express.js, Socket.io)
│   ├── config        # Configuration files (DB, env variables, etc.)
│   ├── controllers   # Route handlers and business logic
│   ├── cronjobs      # Scheduled tasks for the app
│   ├── middlewares   # Authentication & other middleware
│   ├── models        # Database models (Sequelize, Mongoose, etc.)
│   ├── routes        # API route definitions
│   ├── services      # Utility functions and helper services
│   ├── socket        # Socket.io event handlers
│   ├── validation    # Input validation logic
│   ├── .env          # Environment variables (excluded from version control)
│   ├── app.js        # Main server entry point
│   └── package.json  # Backend dependencies
│
├── frontend          # Client-side code (React.js)
│   ├── public        # Static assets
│   ├── src           # React components, hooks, pages, context
│   ├── .env          # Frontend environment variables
│   ├── index.html    # Main HTML file
│   ├── package.json  # Frontend dependencies
│   └── eslint.config.js # Linting configuration
│
└── .gitignore        # Files to ignore in Git
```

---

## 🚀 Getting Started 🏁📌🔧

### 1️⃣ Clone the Repository 📂🖥️🔄

```sh
git clone https://github.com/subha-guchait/groupChatApp.git
cd chat-app
```

### 2️⃣ Install Dependencies 📦📥⚙️

#### Backend:

```sh
cd backend
npm install
```

#### Frontend:

```sh
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables 🌍🔑📝

#### Backend `.env` Example:

Create a `.env` file inside the `backend/` folder and copy the following:

```

PORT = Port_number

# DataBase Details
DB_USER = your_db_username
DB_PASSWORD =your_db_password
DB_NAME = your_db_name
DB_HOST = your_db_host_ip
DB_DIALECT = your_db_dialect

#JWT Secret
JWT_SECRET = your_secret_key

#AWS SECRET
AWS_REGION=your_aws_region
AWS_BUCKET=your_s3_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

#### Frontend `.env` Example:

Create a `.env` file inside the `frontend/` folder and copy the following:

```
VITE_API_URL=your_backend_api_url
```

### 4️⃣ Start the Application 🚀🔥🛠️

#### Start Backend Server:

```sh
cd backend
npm start
```

#### Start Frontend:

```sh
cd frontend
npm run dev
```

---

## 🌟 Features 🌍📢✨

- **User Authentication** (JWT-based login/register)
- **Real-time Messaging** using **Socket.io**
- **Group Chat Management** (Create, Join, Delete Groups,Add User, Remove User)
- **Media Uploads** using **AWS S3 **
- **Optimized Search** with **Debounced API calls**
- **Pagination & Infinite Scrolling** for loading groups

---

## 📌 Tech Stack 🏗️🖥️⚙️

### Frontend:

- React.js (Vite)
- Tailwind CSS
- Daisy UI
- React Router
- React Hot Toast (Notifications)

### Backend:

- Node.js with Express.js
- Sequelize ( MySQL)
- Socket.io for real-time communication
- JWT Authentication
- AWS S3 for media storage

---

## 🔥 Future Improvements 🔮🚀💡

- Add **message reactions & typing indicators**
- Implement **push notifications**
- Support **voice & video calls**

---

## 🤝 Contributing 🙌💻📜

Pull requests are welcome! Please fork the repository and submit a PR with your changes.

---

## 📜 License 📝📄🔓

This project is licensed under the **MIT License**. 🎉📝✅
