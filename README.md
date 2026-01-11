# Time Management System

A web application for planning and organizing daily time using schedule-based time blocks.
The system focuses on time allocation rather than task tracking.

## Team — SE-2427
- Yesset
- Meiirzhan
- Miras
- Nurtore

## Project Topic
Time management and daily schedule planning.

## Planned Features
- Daily time blocks
- Activity types
- Schedule visualization
- Weekly overview
- Editable schedules

## Routes
- GET / – Home page
- GET /about – Information about the team and project
- GET /contact – Contact page with form
- POST /contact – Handles contact form submission
- GET /search?q=value – displays search results using query parameters
- GET /item/:id – displays item information using route parameters
- GET /api/info – returns project information in JSON format
- 404 – Custom page for unknown routes

## Contact Form
The contact form includes:
- Name
- Email
- Message

Form data is sent using the POST method and processed on the server using `req.body`.
After submission, the server returns a confirmation message to the user.

## Database
The project uses **PostgreSQL** as a database.

### Main Table: items
The database contains one main entity used for CRUD operations.

Fields:
- `id` — SERIAL, Primary Key
- `title` — TEXT, required
- `description` — TEXT, required

The table is created automatically when the server starts if it does not already exist.


## CRUD API

The following REST API endpoints are implemented for the `items` entity:

- `GET /api/items`  
  Returns all items sorted by id in ascending order.

- `GET /api/items/:id`  
  Returns a single item by its id.

- `POST /api/items`  
  Creates a new item using JSON request body.

- `PUT /api/items/:id`  
  Updates an existing item by id using JSON request body.

- `DELETE /api/items/:id`  
  Deletes an item by id.

All responses are returned in JSON format.

## Validation and HTTP Status Codes
The API uses proper HTTP status codes:

- `200 OK` — successful GET, PUT, DELETE requests
- `201 Created` — successful POST request
- `400 Bad Request` — invalid id or missing required fields
- `404 Not Found` — item does not exist
- `500 Internal Server Error` — server or database error

## API Testing Links
For quick testing, the Home page (`/`) includes direct links to:
- `/api/items`
- `/api/items/1`

## Installation & Run
```bash
npm install
node app.js