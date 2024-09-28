# Instructions

For the backend development of the application, I used Node.js with Express, a JSON file for the database, and CORS for the connection between the frontend and the backend. The JSON file is used as a temporary storage for user votes.

## Description

This project is part of a country vote challenge, allowing users to:

- Submit a vote for their favorite country by entering their name, email, and selected country.
- Search through the top 10 most voted countries using keywords related to country name, capital, region, subregion, or number of votes.
- View the top 10 countries with the most votes, dynamically updated after each vote submission.


## Dependencies

- **Express**: For setting up the server and handling routes.
- **Axios**: For making HTTP requests to external APIs.
- **CORS**: For enabling cross-origin resource sharing between the frontend and backend.
- **Dotenv**: For loading environment variables from a `.env` file.
- **Nodemon**: For automatically restarting the server during development whenever file changes are detected.


## Installing

Download or clone this repository:

```bash
cd (project-folder-path)
npm install
```

### Development Server

Run `npm run dev` to start a development server. The application will automatically reload if you change any of the source files.

### Creating the Database

To create the database, execute the following URL in Postman:

```bash
http://localhost:3000/createDB
```

## Design Choices


### Data Storage

I chose to use a local JSON file as the database for simplicity during development. This allows for quick prototyping without needing a full database setup. However, for a production environment, I would recommend migrating to a proper database like MongoDB or PostgreSQL for scalability and performance.


### Error Handling

Error handling is implemented for each endpoint, returning appropriate HTTP status codes and messages when necessary.

### Security Considerations

Authentication can be integrated using `jsonwebtoken` for protecting sensitive routes or vote submissions. This is particularly important if the application will be deployed in a production environment.

### Scalability and Future Enhancements

While a JSON file is suitable for development and small-scale applications, moving to a real database like MongoDB would greatly improve scalability.

Firebase Admin can also be used if the application requires real-time database capabilities, cloud functions, or authentication mechanisms.

### Decision due to time constraints

Due to time constraints, I decided to use a JSON file for data storage rather than implementing a full database solution like MongoDB or PostgreSQL. 
This approach allowed for faster prototyping and development, as the file-based system is simpler to set up and requires no additional infrastructure. 
While this is suitable for development and small-scale testing, it is not ideal for scalability or performance in a production environment. 
In a future iteration, migrating to a proper database would improve both scalability and data integrity.


