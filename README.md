# Social-Network-API

## Description

This project is a social network API designed for a social media startup. It utilizes a NoSQL database, specifically MongoDB, to manage and store large amounts of unstructured data. The API allows for efficient handling of users, thoughts, reactions, and friend lists, making it an ideal solution for a social networking platform.

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Features](#features)
- [API Routes](#api-routes)
- [Models](#models)
- [Tests](#tests)
- [Acknowledgements](#acknowledgements)

## Usage

Once the server is running, you can use Insomnia or any other API client to interact with the API. The Mongoose models will sync with the MongoDB database upon server startup.

## Features

1. User Management:

   - Create, update, and delete user profiles with unique usernames and email addresses.
   - Maintain a list of friends for each user, with the ability to add and remove friends.

2. Thoughts and Reactions:

   - Create, update, and delete thoughts (posts) associated with a user.
   - Allow users to react to thoughts with reactions, which can be added or removed.

3. Data Relationships:

   - Efficiently manage relationships between users, thoughts, and reactions using Mongoose schemas.
   - Automatically update related data, such as user’s thought lists and friend lists, when changes occur.

4. API Documentation:

   - Easily test and interact with the API using Insomnia or similar tools, with clearly defined routes for CRUD operations on users, thoughts, reactions, and friends.
   - JSON responses are formatted for readability and usability.

5. NoSQL Database:

   - Leverage MongoDB for scalable and flexible data storage, handling large amounts of unstructured data.
   - Mongoose models sync with the MongoDB database upon server startup, ensuring data integrity.

6. Performance Optimization:

   - Designed to handle large-scale data with optimized query performance in MongoDB.
   - Supports horizontal scaling to manage growing data and user base.

7. RESTful API Design:

   - Follows RESTful principles, ensuring clear and consistent API routes for efficient data retrieval and manipulation.

## API Routes

### Users

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get a single user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/:id` - Update a user by ID
- DELETE `/api/users/:id` - Delete a user by ID

### Thoughts

- GET `/api/thoughts` - Get all thoughts
- GET `/api/thoughts/:id` - Get a single thought by ID
- POST `/api/thoughts` - Create a new thought
- PUT `/api/thoughts/:id` - Update a thought by ID
- DELETE `/api/thoughts/:id` - Delete a thought by ID

### Reactions

- POST `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- DELETE `/api/thoughts/:thoughtId/reactions/`:reactionId - Remove a reaction from a thought

### Friends

- POST `/api/users/:userId/friends/:friendId` - Add a friend to a user’s friend list
- DELETE `/api/users/:userId/friends/:friendId` - Remove a friend from a user’s friend list

## Models

### User

- `username`: String, required, unique
- `email`: String, required, unique, must match a valid email format
- `thoughts`: Array of `_id` values referencing Thought documents
- `friends`: Array of `_id` values referencing User documents

### Thought

- `thoughtText`: String, required, between 1 and 280 characters
- `createdAt`: Date, default value is the current timestamp
- `username`: String, required, referencing the user who created the thought
- `reactions`: Array of nested documents created with the Reaction schema

### Reaction (Schema only)

- `reactionId`: ObjectId, default value is a new ObjectId
- `reactionBody`: String, required, between 1 and 280 characters
- `username`: String, required
- `createdAt`: Date, default value is the current timestamp

## Tests

You can use tools like Insomnia to manually test the API routes. Automated tests can be added in future iterations.

## Acknowledgements

This project was created as part of a learning exercise and may contain simplistic implementations.
