# Simple REST API

A complete REST API built with Node.js and Express. This API includes CRUD operations for users and products.

## Features

- CRUD operations for users and products
- Input validation and sanitization
- Error handling middleware
- Swagger API documentation
- CORS enabled
- Security headers with Helmet
- Request logging with Morgan

## Prerequisites

- Node.js (v14 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple_rest_api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
NODE_ENV=development
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Access the API documentation:
```
http://localhost:5000/api-docs
```

## API Endpoints

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- POST `/api/users` - Create new user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

## Error Handling

The API includes a centralized error handling middleware that returns consistent error responses:

```json
{
  "success": false,
  "status": 404,
  "message": "Resource not found",
  "stack": "Error stack trace (only in development mode)"
}
``` 