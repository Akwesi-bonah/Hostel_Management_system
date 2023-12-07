# alx_final_project portofolio project (Hostel Management System)
The Hostel Management System is a web application developed using Flask and SQLAlchemy that facilitates the management of hostels, rooms, staff, and student bookings within a campus or educational institution.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Database Structure](#database-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Hostel Management System aims to streamline hostel-related tasks by providing an intuitive user interface for both administrative staff and students. It automates processes related to room management, block allocation, student bookings, and staff management.

## Features

- **Block Management**: Add, edit, or delete blocks within a campus.
- **Room Type Management**: Define different types of rooms available in the hostel.
- **Room Management**: Manage individual rooms, including details such as room names, capacities, and occupancy status.
- **Staff Management**: Maintain records of staff members managing the hostel.
- **Student Management**: Manage student information, including personal details and bookings.
- **Student Bookings**: Enable students to book hostel rooms through the system.
- **Student View Booking Details**: Allow students to view details of their hostel bookings.
- **Student Cancel Booking**: Provide students with the ability to cancel their bookings.

## Installation

To run the Hostel Management System locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Akwesi-bonah/alx_final_project.git
   cd alx_final_project
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database and user:
   - Modify [setup_db.sql](setup_db.sql) to configure your database connection.
   - Run migrations to create the database schema:
     ```bash
      sudo mysql -u root -p < setup_db.sql
     ```
4. set up the environment variables
   - create a .env file in the root directory
   - add the following variables to the .env file
     ```bash
      source env.sh
     ```

## Usage

To start the api run:
```bash
HMS_MYSQL_USER=hms_dev HMS_MYSQL_PWD=hms_dev_pwd HMS_MYSQL_HOST=localhost HMS_MYSQL_DB=hms_dev_db HMS_TYPE_STORAGE=db python3 -m api.v1.app

```

To start the web app run:
```bash
HMS_MYSQL_USER=hms_dev HMS_MYSQL_PWD=hms_dev_pwd HMS_MYSQL_HOST=localhost HMS_MYSQL_DB=hms_dev_db HMS_TYPE_STORAGE=db python3 -m web_flask.main

```
Access the application at `http://localhost:5000` in your web browser.

Student view of the application is available at `http://localhost:500/student/login`.

Staff view of the application is available at `http://localhost:5000/staff/login`.


## Database Structure

The project uses SQLAlchemy ORM and follows this database structure:
- `blocks`: Table storing information about blocks in the hostel.
- `rooms`: Table representing individual rooms with details such as block association, room type, and occupancy.
- `room_types`: Table storing information about different types of rooms available in the hostel.
- `staff`: Table representing staff members managing the hostel.
- `students`: Table storing information about students, including personal details and bookings.
- `bookings`: Table representing student bookings, including details such as room, check-in and check-out dates, and booking status.
- `payment`: Table storing payment details for student bookings.
- `reservation`: Table storing reservation details for student bookings.




For more details about the database structure, refer to the models in the codebase.

## API Documentation

The Hostel Management System provides APIs for interacting with the system programmatically. # Block API Documentation

## Endpoints

### GET /block
- Description: Retrieves the list of all Block objects.
- Response: Returns a JSON array containing all Block objects.

### GET /block/<block_id>
- Description: Retrieves a specific Block object by ID.
- Parameters:
  - `block_id`: ID of the Block object.
- Response: Returns JSON data representing the Block object if found.

### POST /block
- Description: Creates a new Block object.
- Request Body: JSON data containing the attributes for a new Block object.
- Response: Returns the created Block object in JSON format if successful.
   
### PUT /block/<block_id>
- Description: Updates an existing Block object by ID.
- Parameters:
  - `block_id`: ID of the Block object to be updated.
- Request Body: JSON data containing the attributes to update.
- Response: Returns the updated Block object in JSON format if successful.

### DELETE /block/<block_id>
- Description: Deletes a Block object by ID.
- Parameters:
  - `block_id`: ID of the Block object to be deleted.
- Response: Returns an empty JSON response if successful.

## Error Handling

- **400 Bad Request**: Occurs when the request is not in JSON format or lacks required fields during Block creation or update.
- **404 Not Found**: Returned when the requested Block object is not found (GET, DELETE requests).
- **409 Conflict**: Occurs when trying to create a Block object with a name that already exists.

## Sample Usage

```bash
# Get all blocks
curl -X GET http://localhost:5000/block

# Get a specific block
curl -X GET http://localhost:5000/block/1

# Create a new block
curl -X POST -H "Content-Type: application/json" -d '{"campus": "Campus A", "name": "Block Name", "description": "Block Description"}' http://localhost:5000/block

# Update an existing block
curl -X PUT -H "Content-Type: application/json" -d '{"description": "Updated Description"}' http://localhost:5000/block/1

# Delete a block
curl -X DELETE http://localhost:5000/block/1

```

#### Students

- **GET /student**:
  - Retrieves all Student objects.
  - **Usage**: Fetches a list of all registered students.

- **GET /student/<student_id>**:
  - Retrieves a specific Student object by ID.
  - **Usage**: Fetches details of a student by providing their unique ID.

- **DELETE /student/<student_id>**:
  - Deletes a Student object by ID.
  - **Usage**: Deletes a student from the system using their unique ID.

- **POST /student**:
  - Creates a new Student object.
  - **Usage**: Adds a new student to the system.

- **PUT /student/<student_id>**:
  - Updates a Student object by ID.
  - **Usage**: Modifies the details of a specific student using their unique ID.

#### Staff

- **GET /staff**:
  - Retrieves all Staff objects.
  - **Usage**: Retrieves a list of all staff members registered in the system.

- **GET /staff/<staff_id>**:
  - Retrieves a specific Staff object by ID.
  - **Usage**: Fetches details of a staff member by providing their unique ID.

- **DELETE /staff/<staff_id>**:
  - Deletes a Staff object by ID.
  - **Usage**: Removes a staff member from the system using their unique ID.

- **POST /staff**:
  - Creates a new Staff object.
  - **Usage**: Registers a new staff member in the system.

- **PUT /staff/<staff_id>**:
  - Updates a Staff object by ID.
  - **Usage**: Modifies the details of a specific staff member using their unique ID.

#### Room

- **GET /room**:
  - Retrieves all Room objects.
  - **Usage**: Fetches a list of all available rooms in the system.

- **GET /room/<room_id>**:
  - Retrieves a specific Room object by ID.
  - **Usage**: Fetches details of a room by providing its unique ID.

- **DELETE /room/<room_id>**:
  - Deletes a Room object by ID.
  - **Usage**: Removes a room from the system using its unique ID.

- **POST /room**:
  - Creates a new Room object.
  - **Usage**: Adds a new room to the system.

- **PUT /room/<room_id>**:
  - Updates a Room object by ID.
  - **Usage**: Modifies the details of a specific room using its unique ID.

#### Room Types

- **GET /room_type**:
  - Retrieves all RoomType objects.
  - **Usage**: Fetches a list of available room types in the system.

- **GET /room_type/<room_type_id>**:
  - Retrieves a specific RoomType object by ID.
  - **Usage**: Fetches details of a room type by providing its unique ID.

- **DELETE /room_type/<room_type_id>**:
  - Deletes a RoomType object by ID.
  - **Usage**: Removes a room type from the system using its unique ID.

- **POST /room_type**:
  - Creates a new RoomType object.
  - **Usage**: Adds a new room type to the system.

- **PUT /room_type/<room_type_id>**:
  - Updates a RoomType object by ID.
  - **Usage**: Modifies the details of a specific room type using its unique ID.



## Contributing

Contributions are welcome! If you want to contribute to this project, please fork the repository and create a pull request.
- [George Arhin-Bonnah](https://github.com/Akwesi-bonah)
- [Godwin Dogbey](https://github.com/GodwinDogbey )
## License

This project is licensed under the [MIT License](LICENSE).


---

