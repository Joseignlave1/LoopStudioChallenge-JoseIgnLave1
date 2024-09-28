import React, { useState, useEffect } from 'react';
import { getCountriesNames, submitVote } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './VoteForm.css';

interface VoteFormProps {
  refreshCountries: () => void; // Callback function to refresh the list of countries
}

/**
 * VoteForm Component
 * 
 * This component allows users to submit their votes for their favorite countries. It handles the input
 * fields for name, email, and country, validates the input, and communicates with the backend service to submit the vote.
 * 
 * @component
 * @param {VoteFormProps} props - The props required by the component, including a refreshCountries function to refresh the countries list after submitting the vote.
 * @returns {JSX.Element} - The rendered vote submission form.
 */

const VoteForm: React.FC<VoteFormProps> = ({ refreshCountries }) => {
  const [name, setName] = useState(''); // User's name
  const [email, setEmail] = useState(''); // User's email
  const [country, setCountry] = useState(''); // Selected country
  const [countries, setCountries] = useState<string[]>([]); // List of valid countries
  const [voteSubmitted, setVoteSubmitted] = useState(false); // Flag indicating if the vote has been submitted
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display if validation fails

  /**
   * Fetches the list of country names when the component mounts.
   * The list is used to validate the user's country input.
   */

  useEffect(() => {
    getCountriesNames()
      .then((data) => {
        setCountries(data); // Sets the list of valid countries
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  /**
   * Handles the form submission.
   * 
   * Validates the input fields and ensures that the selected country is part of the valid country list.
   * Sends the user's vote to the backend via the `submitVote` function. If successful, it triggers the `refreshCountries` function to update the country list.
   * 
   * @param {React.FormEvent} e - The form event triggered on submission.
   */
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if the country exists in the list of countries
    if (!countries.includes(country)) {
      setErrorMessage('Invalid country'); // Sets an error message if the country is not valid
      return;
    }
    // Validate that all fields are filled
    if (!name || !email || !country) {
      setErrorMessage('Please, complete all the inputs'); // Sets an error message if any input is empty
      return;
    }


    try {
      const response = await submitVote(name, email, country); // Submits the vote
      setVoteSubmitted(true); // Marks the vote as submitted
      setErrorMessage(''); // Clears any previous error message

      if (response) {
        refreshCountries(); // Refreshes the country list after submitting the vote
      }
    } catch (error) {
      setErrorMessage('You can only vote one time per email'); // Error message for duplicate votes
      console.error(error);
    }
  };

  return (
    <div className="vote-form">
      {!voteSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h2 id='form-title'>Vote your Favorite Country</h2>
          <div className="items-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="email-container">
              <input
                id='email-input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={email.includes("@") ? "" : "invalid-email"} // Adds a validation class for invalid emails
                required
              />
              {!email.includes("@") && (
                <>
                  <FontAwesomeIcon icon={faCircleExclamation} className='warning-icon' />
                  <p id='invalid-message'>Invalid email</p>
                </>
              )}
            </div>

            <div className="country-container">
              <input
                id='country-input'
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <button type="submit">Submit Vote</button>
          </div>
        </form>
      ) : (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} className='success-icon' />
          Your vote was successfully submitted!
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default VoteForm;
