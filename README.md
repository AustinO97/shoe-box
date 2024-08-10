ShoeBox Application

Introduction

ShoeBox is a full-stack web application built with Flask for the backend and React for the frontend. This application allows users to manage their shoe collection, including adding, editing, reviewing, and categorizing shoes. Users can interact with the database to create, read, update, and delete shoe entries and reviews.

Features
User Management: Users can create accounts, view profiles, and manage their reviews.
Shoe Management: Add new shoes, edit existing ones, delete shoes, and categorize them based on type.
Review System: Users can write and view reviews for each shoe.
Categorization: Shoes can be categorized into different types like road running or trail running shoes.
Directory Structure
The directory structure of the project is as follows:
.
├── client
│   ├── build
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── redux
│   │   ├── index.css
│   │   └── index.js
├── server
│   ├── migrations
│   ├── resources
│   │   ├── categories.py
│   │   ├── reviews.py
│   │   ├── routes.py
│   │   ├── shoes.py
│   │   ├── users.py
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   └── seed.py
├── Pipfile
├── Pipfile.lock
├── Procfile.dev
├── README.md

Usage
Upon launching the application, users are greeted with a homepage displaying the available shoes. Users can navigate through different pages using the navbar to view shoes, add new shoes, manage users, or read and write reviews.

Shoe Management
Add a Shoe: Navigate to the "New Shoe" page, fill out the form, and submit to add a new shoe to the collection.
Edit a Shoe: Click on a shoe to view its details, then click the "Edit Shoe" button to modify its details.
Delete a Shoe: From the shoe details page, click the "Remove Shoe" button to delete the shoe.
Review Management
Add a Review: Users can write a review for a shoe by navigating to the shoe's details page and submitting their feedback.
View Reviews: Reviews for each shoe are displayed on the shoe's details page.

Summary
ShoeBox is a user-friendly tool designed to help you organize and manage your shoe collection. Whether you're adding new shoes, categorizing them, or reviewing your favorites, ShoeBox provides a seamless experience.

Happy coding!