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
- 404 – Custom page for unknown routes

## Contact Form
The contact form includes:
- Name
- Email
- Message

Form data is sent using the POST method and processed on the server using `req.body`.
After submission, the server returns a confirmation message to the user.

## Roadmap
- Week 2: Validate forms and POST routes
- Week 3: Integration our backend with database (PostgreSQL)

## Installation & Run
```bash
npm install
node server.js