# 🍳 KitchenLy Server

Backend service for **KitchenLy**, a smart kitchen assistant that helps users manage pantry items, generate recipes, and track shopping lists — all powered by AI.

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

---

## 🌐 Live API

**Base URL:** [https://kitchenly.onrender.com](https://kitchenly.onrender.com)

- **API Documentation:** [https://kitchenly.onrender.com/docs](https://kitchenly.onrender.com/docs)  
- **Status Page:** [https://kitchenly.onrender.com/status](https://kitchenly.onrender.com/status)

---

## 🧩 Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Environment Config:** dotenv  
- **Deployment:** Render  

---

## 📁 Project Structure

```bash
KitchenLy-Server/
│
├── public/
│ ├── index.html                 # Homepage
│ ├── docs.html                  # API Documentation
│ ├── status.html                # API Status Dashboard
│
├── src/
│ ├── controllers/
│ │ ├── aiController.js
│ │ ├── pantryController.js
│ │ ├── recipeController.js
│ │ └── shoppingController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ ├── PantryItem.js
│ │ ├── ShoppingItem.js
│ │ └── User.js
│ ├── routes/
│ │ ├── aiRoutes.js
│ │ ├── auth.js
│ │ ├── pantryRoutes.js
│ │ ├── recipeRoutes.js
│ │ └── shoppingRoutes.js
│
├── package.json
├── README.md
└── server.js
```

---

## 🚀 Available API Routes

| Route | Description |
|-------|--------------|
| `/api/auth` | User authentication and management |
| `/api/pantry` | Manage user pantry items |
| `/api/recipes` | Generate or fetch recipes |
| `/api/shopping` | Handle shopping lists |
| `/api/ai` | AI-powered recommendations and analysis |

> For full request/response examples, visit the [API Docs](https://kitchenly.onrender.com/docs).

---

## 🩺 Health & Status

Monitor uptime and database connection:
> [https://kitchenly.onrender.com/status](https://kitchenly.onrender.com/docs)

---

## ⚖️ License

This project is licensed under the [MIT License](LICENSE) - free to use and modify with credit.

---

## 🧑‍💻 Author

**Shakti Suraj**(@0xroot-suraj)
> Made with dedication and creativity for the KitchenLy project.

---

## 🤝 Contribution

Contributions, suggestions, and feedback are welcome!
Open an issue or submit a pull request to help improve **KitchenLy**.

<p align="center">
  <sub>© 2025 KitchenLy — All rights reserved. Designed & Developed by <b>Shakti Suraj</b></sub>
</p>

---