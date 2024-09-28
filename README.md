## Information

The frontend of the application was built using React to create a responsive and interactive interface for voting and displaying the top-voted countries. The user can submit their vote for a favorite country, search through the list of top 10 most voted countries, and view detailed information such as the country’s capital, region, and number of votes.

## Description

This project is part of a country vote challenge, allowing users to:

- Submit a vote for their favorite country by entering their name, email, and selected country.
- Search through the top 10 most voted countries using keywords related to country name, capital, region, subregion, or number of votes.
- View the top 10 countries with the most votes, dynamically updated after each vote submission.

## Dependencies

- **axios**: Used to send HTTP requests to the backend for retrieving country names and submitting votes.
- **react**: The core library for building the user interface.
- **@fortawesome/react-fontawesome** and **@fortawesome/free-solid-svg-icons**: Used for adding icons to the user interface (e.g., search and validation icons).
- **react-scripts**: For development and build scripts.
- **css**: Custom styles for the `VoteForm` and `CountryTable` components.

## Installing

1. Clone or download the repository.
2. Navigate to the frontend directory.
3. Run the following command to install the dependencies:

   ```bash
   npm install


### Executing the Program

To run the frontend development server:

1. Ensure that the backend service is running.
2. Start the frontend with:

   
```bash
   npm start
```


3. The app will open in your default web browser at http://localhost:3001.

### Components

- **VoteForm**: A form where the user can submit their vote by entering their name, email, and country. It performs validation to ensure the inputs are correct before submitting the vote to the backend.

- **CountryTable**: Displays a table of the top 10 most voted countries. Users can search the table by country name, capital city, region, subregion, or vote count.

- **VoteApp**: The parent component that manages the state of the country list and passes necessary functions to update the country data between the form and the table.


## Functional Requirements

### Voting Form

The Voting Form allows users to submit their vote by entering their name, email, and typing their favorite country in an input field

### Country Display Table

The Country Display Table shows a list of the top 10 countries sorted by the number of votes.

### Design Choices and How They Meet Requirements

- **Form Validation**: The `VoteForm` component validates that the name, email, and country fields are filled out and ensures the email follows a valid format. This ensures data integrity by preventing empty or incorrectly formatted submissions. By implementing client-side validation, users are guided to provide correct inputs, improving overall usability.

- **Dynamic Updates**: The application dynamically updates the list of top-voted countries each time a new vote is submitted. This ensures that users see real-time data, meeting the functional requirement of showing the most up-to-date top 10 countries.

- **Search Functionality**: The search functionality within the `CountryTable` allows users to filter countries by different criteria such as country name, capital, region, subregion, or number of votes. This provides flexibility in how users interact with the data, enhancing usability and meeting user expectations for navigating a large set of data.

### Decision due to time constraints

Due to time constraints, I decided to implement the search functionality and form validation manually in the CountryTable and VoteForm components, respectively, instead of utilizing external libraries like Formik or React-Select. While these libraries could provide more robust handling of forms, input validation, and enhanced user experience, implementing these functionalities manually allowed for faster development and greater control over the code.
