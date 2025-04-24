# School Management API

A Node.js API for managing school data with Express.js framework and MySQL database. This API allows you to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features

- Add new schools with name, address, latitude, and longitude
- List schools sorted by proximity to a user-specified location
- RESTful API design
- Input validation

## Prerequisites

- Node.js (v14+ recommended)
- MySQL Database
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd school-management-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following configuration:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   NODE_ENV=development
   ```

4. Create a MySQL database named `school_management`:
   ```sql
   CREATE DATABASE IF NOT EXISTS school_management;
   ```

5. Start the server:
   ```
   npm run dev  # For development with nodemon
   ```
   or
   ```
   npm start    # For production
   ```

## API Endpoints

### Add a School
- **URL**: `/api/schools`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 Main Street, City, Country",
    "latitude": 12.345678,
    "longitude": 98.765432
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "success": true,
      "message": "School added successfully",
      "data": {
        "id": 1,
        "name": "Example School",
        "address": "123 Main Street, City, Country",
        "latitude": 12.345678,
        "longitude": 98.765432
      }
    }
    ```

### List Schools by Proximity
- **URL**: `/api/schools?latitude=12.34&longitude=98.76`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude (required)
  - `longitude`: User's longitude (required)
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "success": true,
      "count": 2,
      "data": [
        {
          "id": 1,
          "name": "School One",
          "address": "Address One",
          "latitude": 12.34,
          "longitude": 98.76,
          "distance": 0
        },
        {
          "id": 2,
          "name": "School Two",
          "address": "Address Two",
          "latitude": 12.38,
          "longitude": 98.72,
          "distance": 7.8532
        }
      ]
    }
    ```

## Postman Collection

A Postman collection for testing the API is available at:
[School Management API Collection](https://www.postman.com/your-collection-link)

## Deployment

The API can be deployed to services like Heroku, AWS, or any other hosting provider that supports Node.js applications.

## License

This project is licensed under the ISC License. 