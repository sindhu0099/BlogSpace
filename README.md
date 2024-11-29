# BlogSpace

This is a backend API built to manage blog posts and handle user authentication. The API allows users to securely register, log in, and manage their blog posts. It provides endpoints for creating, updating, and deleting  blog posts, as well as user registration and authentication using tokens (e.g., JWT). This system ensures that only authenticated users can modify their own posts, offering secure access and management for both users and their content.

## Installation

1. Clone the repository

   git clone https://github.com/sindhu0099/BlogSpace.git

   The code is in dev branch.


## How to start
  
   npm start

## API Documentation

The API is documented using Postman. You can import the following Postman collection into your Postman app to interact with the API:

- [Download Postman Collection (JSON)](./Api_documentaion.json)

### How to Import the Postman Collection

1. Download the Postman collection from the link above.
2. Open Postman and click on **Import** in the top left corner.
3. Select the downloaded file and click **Open**.
4. The collection will be imported into Postman, and you can start testing the API.

### API Endpoints Overview

You can also view a brief overview of the API endpoints below:
- **POST /users/** - Register a new user.
- **POST /users/login** - Log in and get a token.
- **GET /posts** - Get all blog posts.
- **POST /posts** - Create a new blog post.




   


