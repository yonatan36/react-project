# React Sales Site - Business Card Marketplace

This project is a sales site that displays business cards of users for purchase. The information is stored in a MongoDB database. The project was built using React, Material UI, MongoDB, and Express Server.




 ##  The project was built using the following technologies:

- React
- Material UI
- MongoDB
- joi
- axios
- jwt-decode
- react-router-dom
- Express Server


## Running the Project

To run the project, follow these steps:

1. Extract the folder from the provided zip file.
2. Open your terminal.
3. Navigate to the extracted project folder.
4. Install the required packages by running the command `npm install`. 5. Start the server by running the start.bat file located in the "server-for-project" folder. 6. Start the project using the command `npm start`.

## Database Configuration

This project uses a MongoDB database to store the information. To configure the database connection, follow these steps:

1. Open the project in your preferred code editor.
2. Locate the `.env` file in the project's root directory.
3. Set the `MONGODB_URI` variable to your MongoDB database connection string.

## User Interface

The user interface of the sales site has the following features:

1. When the user is connected, the links in the navigation bar will change to "Signup" and "Login". The "FAV CARDS" link will be added to the avatar image, leading to the cards page displaying favorites of the user.
2. If the user is a business user type, a link called "MY CARDS" will be added to the navigation bar. Clicking on it will lead to the cards page that the user created.
3. If the user is of the admin type, a "SANDBOX" bar will be added to the navigation bar, leading to a sandbox page.

## Permissions

The permissions for different user types are as follows:

1. A user who is not logged in can only click on the phone icon.
2. A logged-in user who is not a business or admin can see and mark a card as preferred for business visits.
3. A logged-in business type user can see the "Edit" and "Delete" icons only for the cards they have created. They can edit and delete their own cards.
4. An admin type user can delete any business card but can only edit the cards they created.
