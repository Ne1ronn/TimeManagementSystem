# Time Management System

A full-stack web application for planning and organizing daily time using schedule-based time blocks.  
The system focuses on time allocation and schedule visualization rather than simple task tracking.

The application includes a backend API built with Node.js and Express, a MongoDB database, and a production-ready web interface that demonstrates full CRUD functionality.

## Team — SE-2427

- Yesset
- Meiirzhan
- Miras
- Nurtore

## Project Topic

Time management and daily schedule planning.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- HTML, CSS, JavaScript
- Fetch API
- dotenv

## Planned & Implemented Features

- Daily time blocks
- Activity types
- Schedule visualization
- Weekly overview
- Editable schedules
- Full CRUD operations through web interface

## Routes

### Web Routes

- GET / – Home page (production web interface)
- GET /about – Information about the team and project
- GET /contact – Contact page with form
- POST /contact – Handles contact form submission
- GET /search?q=value – Displays search results using query parameters
- GET /item/:id – Displays item information using route parameters
- 404 – Custom page for unknown routes

### API Routes

- GET /api/info – Returns project information in JSON format

## Database

The project uses **MongoDB** as a database.

### Main Collection: time_blocks

Fields:

- `_id` — ObjectId (generated automatically by MongoDB)
- `title` — string, required
- `description` — string, required

The collection is created automatically on the first insert operation.

## CRUD API

The following REST API endpoints are implemented for the `time_blocks` entity:

- `GET /api/time-blocks`  
  Returns all items.

- `GET /api/time-blocks/:id`  
  Returns a single item by its MongoDB ObjectId.

- `POST /api/time-blocks`  
  Creates a new item using JSON request body.

- `PUT /api/time-blocks/:id`  
  Updates an existing item by id using JSON request body.

- `DELETE /api/time-blocks/:id`  
  Deletes an item by id.

All responses are returned in JSON format.

## Validation and HTTP Status Codes

The API uses proper HTTP status codes:

- `200 OK` — successful GET, PUT, DELETE requests
- `201 Created` — successful POST request
- `400 Bad Request` — invalid id or missing required fields
- `404 Not Found` — item does not exist
- `500 Internal Server Error` — server or database error

## Environment Variables

The application uses environment variables for configuration.

Required variables:

- `PORT`
- `MONGO_URI`

Rules:

- `.env` file is used locally
- Production variables are set via the hosting platform
- `.env` file must not be pushed to GitHub

## Installation & Run

```bash
npm install
node app.js
```
