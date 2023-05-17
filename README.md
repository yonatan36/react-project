# React Sales Site

The project aims to create a web application called "yoyo" that allows users to manage and share digital business cards.

## The project was built using the following technologies:

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

1. Extract the folder from the provided zip file and after Navigate to the extracted project folder.
2. Open the project in your preferred code editor.
3. Install the required packages by running the command `npm install`.
4. Make sure that the data base was created in the mongodb, and import the json files to the collections
5. Start the server by running the start.bat file located in the "server-for-project" folder.
6. In VSCode, start the development server: using the command `npm start`.
7. Welcome! access the application in your web browser at http://localhost:3000.



## User Interface

The user interface of the sales site has the following features:

1. When the user is will connect, the signup and login links will change to Avatar picture.  And the FAV CARDS link will be added that will lead to the cards page
Favorites of the surfer.
2. If the user is a business user type, a link called "MY CARDS" will be added to the navigation bar. Clicking on it will lead to the cards page that the user created.
3. If the user is of the admin type, a "SANDBOX" link will be added to the navigation bar, leading to a sandbox page.

## Permissions


The permissions for different user types are as follows:

1. A user who is not logged in can only click on the phone icon.
2. A logged-in user that is not a business-type or admin can see and mark a card as preferred.
3. A logged-in user that is a business type can see the "Edit" and "Delete"  icons only for the cards he has created. He can edit and delete only his own cards.
4. An admin-type user can delete any business card but can only edit the cards they created.
  
  
  ##Contact

If you have a question about the project - I'd love to be in touch! my email: yonatantaub36@gmail.com