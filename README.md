Warning: Sensitive Information Omitted
All API keys and key information required for database connections have been removed. 
The backend functionality WILL NOT WORK unless you provide the necessary information.

# My Awesome Blog App

Welcome to My Awesome Blog App! This application allows users to create, edit, and explore blog posts. Please note that sensitive information has been omitted from the code snippets for security reasons.

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Fill in the `firebase.js` file with your own information. To access the create post function, users must be logged in.
4. Connect the project to a PostgreSQL database with the given schema provided below. All posts are fetched from the database.

## Usage

1. Run the app locally using `npm start`.
2. Navigate to the homepage, log in to an account, create new blog posts, view individual posts, and explore other features.
3. To create a post, click on the "Create Post" link in the navigation bar.
4. To view a single post, click on a post title from the homepage.
5. To edit a post, click on the "Edit" button located in the bottom right corner while viewing the post.
6. To delete a post, click on the "Delete" button located in the bottom right corner.
7. You can like posts and write comments.
8. Use the search functionality to find posts based on keywords.
9. Explore tag-based searches by clicking on a tag in the "Tags" section.

## Configuration

- Configuration files can be found in the respective backend and frontend folders.
- Update the necessary configuration options as needed.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Add your message here"`.
4. Push your changes to your forked repository: `git push origin feature-name`.
5. Create a pull request with a detailed description of your changes.

## Contact Information

Have questions or feedback? Feel free to reach out:

- Email: numan.kavurmaci.samsun@gmail.com
- LinkedIn: [Numan Kavurmacı](https://www.linkedin.com/in/numan-kavurmac%C4%B1-227a35247/)



Blog App Backend Documentation
Introduction
This documentation outlines the technical details of the backend of the Blog App, which is responsible for handling various functionalities, including fetching, creating, editing, and deleting blog posts, comments, likes, and tags.

Technologies Used
Node.js: A runtime environment for executing JavaScript code on the server-side.
Express.js: A web application framework for building APIs and handling routes.
Sequelize: An Object-Relational Mapping (ORM) library for interfacing with the PostgreSQL database.
PostgreSQL: A powerful open-source relational database system.
UUID: A library for generating unique IDs.
Axios: A promise-based HTTP client for making API calls.
Firebase Admin SDK: Used for managing and authenticating users.
... (other libraries and technologies used in the app)
API Endpoints
GET /home

Description: Fetches all blog posts from the database.
Response: An array of blog post objects.
GET /SinglePost/:id

Description: Fetches a single blog post along with its comments.
Parameters: id - The unique identifier of the blog post.
Response: An object containing the post details and an array of comments.
POST /CreatePost

Description: Creates a new blog post.
Request Body: Post details including postId, title, content, image, author, date, and tags.
Response: The newly created blog post object.
POST /CreateComment/:id

Description: Creates a new comment for a specific blog post.
Parameters: id - The unique identifier of the blog post.
Request Body: Comment details including comment and author.
Response: The newly created comment object.
DELETE /DeletePost/:id

Description: Deletes a specific blog post along with its comments.
Parameters: id - The unique identifier of the blog post.
Response: A success message.
PUT /EditPost/:id

Description: Edits a specific blog post.
Parameters: id - The unique identifier of the blog post.
Request Body: Updated post details including title, content, image, and author.
Response: The updated blog post object.
GET /search

Description: Searches for blog posts based on a search query.
Query Parameter: query - The search query.
Response: An array of blog post objects matching the search query.
GET /CheckUserLikedPost/:userId/:postId

Description: Checks if a user has liked a specific post.
Parameters: userId - The unique identifier of the user, postId - The unique identifier of the post.
Response: Boolean indicating whether the user liked the post or not.
DELETE /RemoveLike

Description: Removes a like from a post.
Request Body: userId - The unique identifier of the user, postId - The unique identifier of the post.
Response: A success message.
POST /likePost/:id

Description: Likes a specific post.
Parameters: id - The unique identifier of the post.
Request Body: userId - The unique identifier of the user.
Response: A success message.
GET /searchtag/:tag

Description: Searches for blog posts based on a specific tag.
Parameters: tag - The tag to search for.
Response: An array of blog post objects with the specified tag.
GET /tags

Description: Fetches all available tags.
Response: An array of tag objects.
Authentication and Authorization
The Firebase Admin SDK is used for managing user authentication. Certain routes are protected and require valid user authentication to access. Authorization checks ensure that users can only perform actions on their own content.

Database Interaction
Sequelize is used to interact with the PostgreSQL database. It handles database connection, querying, and updates for various tables, including posts, comments, tags, and Likes.

Error Handling
Errors are appropriately handled using try-catch blocks. If an error occurs during any operation, an appropriate error response is sent back to the client.

Deployment
The backend server is deployed and hosted on a server or cloud service provider. This allows the frontend to communicate with the backend API via HTTP requests.

Conclusion
This documentation provides a comprehensive overview of the backend architecture and functionalities of the Blog App. It outlines the technologies used, the API endpoints, authentication, database interactions, error handling, and deployment. Developers can use this documentation to understand how the backend works and make any necessary modifications or improvements.


===============================================================================================================================================================================================


Blog App Frontend Documentation
Introduction
This documentation outlines the technical details of the frontend of the Blog App, which is responsible for presenting the user interface and interacting with the user. The frontend is built using React, Bootstrap, and Firebase for authentication.

Technologies Used
React: A JavaScript library for building user interfaces.
Bootstrap: A popular CSS framework for creating responsive and visually appealing web designs.
Firebase: A cloud-based platform that provides various services, including authentication.
React Router: A library for handling routing within a React application.
Project Structure
App.js: The main entry point of the application. It sets up the router and renders different components based on the current route.
AuthDetails.js: Displays user authentication details such as username and email.
CreatePost.js: Provides a form for creating a new blog post.
EditPost.js: Allows editing an existing blog post.
ForgotPassword.js: Provides functionality to reset the password.
Header.js: Displays the navigation bar at the top of the page.
Home.js: Displays a list of blog posts on the home page.
Login.js: Provides a form for user login.
Register.js: Provides a form for user registration.
SearchResults.js: Displays search results for a given query.
SinglePost.js: Displays a single blog post along with its comments.
TagSearchResults.js: Displays search results based on a specific tag.
StateProvider.js: Provides a context API for managing global state.
auth.js: Provides the authentication context using Firebase.
Router Setup
The application uses the BrowserRouter from react-router-dom to set up routing for different components. The Routes component defines the mapping between URL paths and the corresponding components to render.

Authentication
Firebase is used for user authentication. The AuthProvider wraps the entire application, allowing components to access authentication state, such as the current user.

Component Responsibilities
Header: Displays the navigation bar with links to different sections of the app. It conditionally displays links based on the user's authentication status.
Home: Renders a list of blog posts on the home page. Each blog post item is clickable and leads to the detailed post view.
SinglePost: Displays a single blog post with its details, including the content and comments.
CreatePost: Provides a form for creating a new blog post. Users can enter the post title, content, and tags.
EditPost: Similar to CreatePost, but allows editing an existing blog post.
SearchResults: Displays search results based on a query. It lists matching blog posts.
TagSearchResults: Displays search results based on a specific tag. It lists blog posts with the specified tag.
Login: Provides a form for user login with email and password.
Register: Provides a form for user registration with email and password.
ForgotPassword: Allows users to reset their password by providing their email.
UI and Styling
The application's user interface is designed using the Bootstrap CSS framework, which provides responsive and visually appealing design elements.

Context and State Management
The useStateValue hook from the StateProvider allows components to access and update global state, such as the user's authentication status.

Conclusion
This documentation provides an in-depth overview of the frontend architecture and functionalities of the Blog App. It covers the technologies used, component responsibilities, routing setup, authentication, styling, and state management. Developers can use this documentation to understand how the frontend works and make any necessary modifications or enhancements.


===============================================================================================================================================================================================


SQL Database Documentation

This documentation provides an overview of the SQL database schema used in the blog application. The database consists of four tables, each serving a specific purpose to store information related to user interactions, posts, comments, and tags. Below is a detailed description of each table:

Table: Likes

Columns:
id: Unique identifier for each like entry.
userId: Identifier of the user who liked the post.
postId: Identifier of the post that was liked.
This table stores information about which users have liked specific posts. It establishes a relationship between users and the posts they have liked.

Table: Comments

Columns:
id: Unique identifier for each comment.
postId: Identifier of the post to which the comment belongs.
comment: Text content of the comment.
date: Date when the comment was made.
author: Name of the user who authored the comment.
The Comments table stores user-generated comments associated with particular posts. It includes information about the comment's content, creation date, and the user who posted it.

Table: BlogPost

Columns:
id: Unique identifier for each blog post.
title: Title of the blog post.
content: Main content of the blog post.
author: Name of the user who authored the post.
date: Date when the post was published.
likes: Number of likes the post has received.
tags: Tags associated with the post.
This table represents individual blog posts. It stores detailed information about each post, including its title, content, author, publication date, likes count, and associated tags.

Table: Tags

Columns:
id: Unique identifier for each tag.
name: Name of the tag.
posts: A JSON-like string containing an array of post IDs associated with the tag.
The Tags table maintains information about different tags used in the blog posts. It includes the tag's name and an array of post IDs that are associated with that tag. The array is stored as a JSON-like string.

It's important to note that this documentation provides an overview of the tables and their columns, but it omits sensitive information such as database credentials, keys, and connections, as indicated in the warning. To make the application functional, you need to replace the omitted information with your own database configuration and API keys.

For further details on the database structure and relationships, you can refer to the actual code implementation in your application's backend.












