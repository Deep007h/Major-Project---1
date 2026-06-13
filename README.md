# WanderLand - Property Listing Platform

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Bootstrap-5.3-FF6C00?style=for-the-badge&logo=bootstrap" alt="Bootstrap">
  <img src="https://img.shields.io/badge/EJS-Templates-yellow?style=for-the-badge&logo=ejs" alt="EJS">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

A full-stack web application for browsing and managing property listings, built with Express.js, MongoDB, Bootstrap 5, and EJS.

---

## Features

- **Create Listings** - Add new properties with title, description, price, location, and country
- **Browse Listings** - View all available properties in a beautiful card-based gallery
- **Edit Listings** - Update property details with form validation
- **Delete Listings** - Remove properties with confirmation dialog
- **Flash Messages** - User feedback for all actions (success/error)
- **Modern UI** - Clean, responsive design with Bootstrap 5
- **Form Validation** - Client-side (browser) and server-side (model-level) validation
- **Error Handling** - Custom error pages with proper HTTP status codes
- **Responsive Design** - Works on desktop, tablet, and mobile devices

---

## Tech Stack

| Technology     | Purpose              | Version  |
|----------------|----------------------|----------|
| Node.js        | Runtime environment  | ^20.x    |
| Express.js     | Web framework        | ^5.1.0   |
| MongoDB        | Database             | ^7.x     |
| Mongoose       | ODM for MongoDB      | ^8.16.0  |
| EJS            | Template engine      | ^3.1.10  |
| EJS-Mate       | Layout engine for EJS| ^4.0.0   |
| Bootstrap 5    | CSS Framework        | 5.3      |
| Font Awesome   | Icons                | 6.7.2    |
| Express Session| Session management   | ^1.18.0  |
| Connect Flash  | Flash messages       | ^1.1.1   |
| Method-Override| HTTP method override | ^3.0.0   |

---

## Project Structure

```
Major-Project---1/
├── .github/
│   └── workflows/
│       ├── daily-contribution.yml   # Automated contribution tracker
│       └── bug-tracker.yml          # Weekly bug/issue report
├── models/
│   └── listing.js                   # Mongoose schema for listings
├── views/
│   ├── includes/
│   │   ├── footer.ejs               # Site footer
│   │   └── navbar.ejs               # Navigation bar
│   ├── layouts/
│   │   └── boilerplate.ejs          # Base layout with flash messages
│   └── listings/
│       ├── index.ejs                # Home page - all listings
│       ├── new.ejs                  # Create new listing form
│       ├── show.ejs                 # View listing details
│       ├── edit.ejs                 # Edit listing form
│       └── error.ejs                # Error page
├── public/
│   └── css/
│       └── style.css                # Custom styles
├── utils/
│   ├── catchAsync.js                # Async error wrapper
│   └── ExpressError.js              # Custom error class
├── init/
│   ├── index.js                     # Database initialization/seeding
│   └── data.js                      # Sample listing data
├── app.js                           # Main application entry point
├── package.json                     # Dependencies and scripts
├── package-lock.json
├── CONTRIBUTIONS.md                 # Daily contribution log
└── README.md                        # This file
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/download-center/community)
- **npm** (comes with Node.js)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Deep007h/Major-Project---1.git
cd Major-Project---1
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure MongoDB

The application connects to MongoDB using the connection string provided via the `MONGO_URL` environment variable. If not set, it defaults to a local MongoDB instance.

**Option A - Local MongoDB:**

Start your local MongoDB server:

```bash
# Linux/macOS
mongod

# Windows (run in a separate terminal)
mongod
```

The application will connect automatically to `mongodb://127.0.0.1:27017/wanderland`.

**Option B - MongoDB Atlas (Cloud):**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Set the environment variable:

```bash
export MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/wanderland?retryWrites=true&w=majority"
```

#### 4. (Optional) Seed the Database with Sample Data

```bash
node init/index.js
```

This will populate the database with 30 sample property listings for testing.

#### 5. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

#### 6. Access the Application

Open your browser and visit: **http://localhost:8080**

---

## MongoDB Configuration

### Schema

The `Listing` model has the following schema:

| Field         | Type     | Required | Default                                        | Validation               |
|---------------|----------|----------|------------------------------------------------|---------------------------|
| title         | String   | Yes      | -                                              | -                         |
| description   | String   | No       | "This is a Beautiful Site..."                  | -                         |
| image.url     | String   | No       | Unsplash default image URL                     | -                         |
| image.filename| String   | No       | -                                              | -                         |
| price         | Number   | Yes      | -                                              | Must be >= 0              |
| location      | String   | Yes      | -                                              | -                         |
| country       | String   | Yes      | -                                              | -                         |

### Environment Variables

| Variable        | Description                   | Default                                    |
|-----------------|-------------------------------|--------------------------------------------|
| `MONGO_URL`     | MongoDB connection string     | `mongodb://127.0.0.1:27017/wanderland`     |
| `PORT`          | Server port                   | `8080`                                     |
| `SESSION_SECRET`| Session encryption secret     | `wanderland_dev_secret_change_in_production`|

> **Important:** In production, always set `SESSION_SECRET` to a strong, unique value. Do not use the default secret.

---

## API Endpoints

| Method | Endpoint                | Description             | Authentication |
|--------|-------------------------|-------------------------|----------------|
| GET    | `/`                     | Redirect to /listings   | None           |
| GET    | `/listings`             | View all listings       | None           |
| GET    | `/listings/new`         | Show create form        | None           |
| POST   | `/listings`             | Create a new listing    | None           |
| GET    | `/listings/:id`         | View listing details    | None           |
| GET    | `/listings/:id/edit`    | Show edit form          | None           |
| PUT    | `/listings/:id`         | Update listing          | None           |
| DELETE | `/listings/:id`         | Delete listing          | None           |

---

## Usage Guide

### Creating a Listing

1. Navigate to **All Listings** from the navbar
2. Click **Add New Listing** button
3. Fill in the required fields:
   - **Title** (required) - Property name
   - **Description** - Property details
   - **Image URL** - Optional image link (default image used if empty)
   - **Price** (required) - Property price in USD
   - **Location** (required) - City/Region
   - **Country** (required) - Country name
4. Click **Create Listing**
5. A success flash message confirms the creation

### Editing a Listing

1. Click on any listing to view details
2. Click the **Edit** button
3. Modify the fields as needed
4. Click **Update Listing**
5. You will be redirected to the updated listing page

### Deleting a Listing

1. View the listing details
2. Click the **Delete** button
3. Confirm the deletion in the browser dialog
4. You will be redirected to the listings page with a success message

---

## Error Handling

The application uses a centralized error handling approach:

- **Async errors**: The `catchAsync` utility wraps all async route handlers and forwards errors to the central error handler
- **Custom ExpressError class**: Provides structured errors with HTTP status codes and messages
- **404 handler**: Catches all undefined routes and returns a proper 404 error page
- **Central error middleware**: Renders a styled error page with the status code and message

---

## Troubleshooting

### MongoDB Connection Error

```
MongoServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Make sure MongoDB is running:

```bash
mongod
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::8080
```

**Solution:** Either kill the process using port 8080, or change the port by setting the `PORT` environment variable:

```bash
export PORT=3000
node app.js
```

### Module Not Found

```
Error: Cannot find module 'express'
```

**Solution:** Reinstall dependencies:

```bash
npm install
```

---

## Screenshots

### Home Page (All Listings)
- Grid of property cards with images, titles, and prices
- Responsive layout (3 columns on desktop, 1 on mobile)
- View and Edit buttons on each card

### Create Listing Page
- Modern form with Bootstrap styling
- Client-side validation
- Required field indicators

### Show Listing Page
- Large hero image
- Property details section
- Edit and Delete buttons
- Back navigation

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Deep007h

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web framework
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Unsplash](https://unsplash.com/) - Stock images for sample data

---

<p align="center">
  Made with by <a href="https://github.com/Deep007h">Deep007h</a>
</p>

[![GitHub stars](https://img.shields.io/github/stars/Deep007h/Major-Project---1?style=social)](https://github.com/Deep007h/Major-Project---1/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Deep007h/Major-Project---1?style=social)](https://github.com/Deep007h/Major-Project---1/network)

