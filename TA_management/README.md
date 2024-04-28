## Overview
This web application is designed for managing the assignment and management of teaching assistants (TAs) within an academic department. It facilitates applications for TA positions, the management process by department staff and TA committee, and feedback submission by instructors.

## Technologies Used
- Node.js
- React.js
- MongoDB

## Installation and Setup
Follow these steps to install and set up the project.

### Prerequisites
- Node.js
- npm or Yarn

### Environment Variables
Before running the application, set the following environment variables in your `.env` file:
- `JWTSECRET`: A secret key for JWT authentication.
- `MONGODBURI`: The URI for your MongoDB database.

### Installation
```bash
git clone https://github.com/Groupp02/TA_management.git
cd TA_management
npm install
cd Frontend && npm install
```

## Running the Application
To run the application, run the following commands in the root directory of the project:
```bash
node app.js
```
