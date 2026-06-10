## 📌 What is MarkVault?

MarkVault is a **production-ready RESTful API** for managing personal bookmarks. Save any URL with a title, description, and tags. Search through everything instantly. Share specific bookmarks publicly with a single flag.

Built as the first project in a serious 4-project backend engineering series — focusing on raw Express.js fundamentals, MongoDB document modeling, JWT authentication, and clean API design.

> **Why this project?** Most bookmark tools are either too bloated or too simple. MarkVault is scoped exactly right — enough complexity to be real, enough restraint to be learnable.

---

## ✨ Features

- 🔐 **JWT Authentication** — Register, login, and secure every endpoint with access tokens
- 🔖 **Full Bookmark CRUD** — Create, read, update, and delete bookmarks
- 🏷️ **Tag System** — Organize bookmarks with multiple personal tags per entry
- 🔍 **Search** — Full-text search across titles and descriptions
- 🌐 **Public Sharing** — Mark any bookmark public and share it without requiring login
- 🛡️ **Security Hardened** — Helmet headers, rate limiting, input validation with Zod
- 🗑️ **Soft Delete** — Nothing is permanently deleted; data is recoverable
- 📋 **Pagination & Filtering** — Filter by tag, paginate results cleanly
- 📝 **Request Logging** — Morgan-powered request logs in development

---

## 🛠 Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Runtime | Node.js 24 | Latest LTS, native ESM support |
| Framework | Express.js 4 | Unopinionated, raw middleware control |
| Database | MongoDB + Mongoose | Document model fits flexible bookmark data |
| Auth | JSON Web Tokens | Stateless, scalable authentication |
| Validation | Zod | Schema-first, TypeScript-friendly validation |
| Security | Helmet + express-rate-limit | HTTP headers + brute force protection |
| Logging | Morgan | Request-level logging in development |
| Password | bcryptjs | Industry-standard password hashing |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB running locally **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/MarkVault.git
cd MarkVault
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/MarkVault
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 4. Start the development server

```bash
npm run dev
```

Server starts at `http://localhost:3000`

Verify it's running:
```bash
curl http://localhost:3000/health
# → { "status": "ok", "timestamp": "..." }
```

---

## 📡 API Reference

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create a new account | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |

### Bookmarks

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/bookmarks` | Create a bookmark | ✅ |
| `GET` | `/api/bookmarks` | Get all your bookmarks | ✅ |
| `GET` | `/api/bookmarks/:id` | Get a single bookmark | ✅ |
| `PUT` | `/api/bookmarks/:id` | Update a bookmark | ✅ |
| `DELETE` | `/api/bookmarks/:id` | Soft delete a bookmark | ✅ |
| `GET` | `/api/bookmarks/search` | Search by keyword | ✅ |
| `GET` | `/api/bookmarks/tag/:tag` | Filter by tag | ✅ |

### Public

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/public/:id` | View a public bookmark | ❌ |

---

### Example Requests

**Register**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Muhammad",
  "email": "muhammad@example.com",
  "password": "securepassword123"
}
```

**Create a Bookmark**
```bash
POST /api/bookmarks
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Node.js Event Loop Explained",
  "url": "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick",
  "description": "Deep dive into how the Node.js event loop works",
  "tags": ["nodejs", "backend", "architecture"],
  "isPublic": false
}
```

**Search Bookmarks**
```bash
GET /api/bookmarks/search?q=nodejs&page=1&limit=10
Authorization: Bearer <your_token>
```

---

## 🏗 Architecture

```
MarkVault/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js  # Register, login logic
│   │   └── bookmark.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT verification
│   │   └── validate.middleware.js # Zod validation
│   ├── models/
│   │   ├── user.model.js       # User schema
│   │   └── bookmark.model.js   # Bookmark schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── bookmark.routes.js
│   ├── utils/
│   │   └── response.js         # Consistent response helper
│   ├── app.js                  # Express app setup
│   └── server.js               # Entry point
├── .env.example
├── .gitignore
└── package.json
```

### Request Lifecycle

```
Request → Route → Middleware (Auth + Validation) → Controller → Model → Response
```

Each layer has exactly one responsibility. Routes don't touch the database. Controllers don't know what URL triggered them. Models know nothing about HTTP.

---

## 🔒 Security Measures

- Passwords hashed with **bcryptjs** (salt rounds: 12)
- JWT tokens expire in **7 days** — configurable via env
- **Helmet.js** sets 11 security-related HTTP headers
- **Rate limiting** — 100 requests per 10 minutes per IP
- All inputs validated with **Zod** before reaching the database
- **Soft deletes** — no data permanently removed without intent
- `.env` never committed — `.gitignore` enforced

---

## 🧠 Key Technical Decisions

**Why tags are embedded, not a separate collection**

Tags in MarkVault are personal — your tags belong to you alone. There's no shared tag library, no tag following, no admin curation. Embedding tags as a string array inside the bookmark document means zero extra queries when fetching bookmarks. A `$set` aggregation update handles renaming across documents in one query.

**Why soft delete over hard delete**

Hard deletes are permanent and unrecoverable. In production systems, you almost never want that. Soft delete (`isDeleted: true`) lets you restore data if a user deletes something by mistake and gives you a complete historical record.

**Why Zod over express-validator**

Zod is schema-first and TypeScript-friendly. You define the shape of valid data once and reuse that schema for both validation and type inference. The error messages are clean and consistent.

---

## 👤 Author

**Muhammad Asadullah**
Senior Frontend Engineer → Full Stack

- Building this as part of a serious backend engineering curriculum covering Express, NestJS, Fastify, MongoDB, and PostgreSQL.
- Part of a 4-project series: MarkVault → HireTrack → PulseBoard → PayFlow

---

## 📄 License

MIT — do whatever you want with it.
