import React, { useState, useEffect } from 'react';
import VoteForm from './VoteForm';
import CountryTable from './CountryTable';
import { getTopVotedCountries } from '../services/api';

/**
 * VoteApp Component
 * 
 * The `VoteApp` component manages the logic between the voting form (`VoteForm`) and the table displaying 
 * the most voted countries (`CountryTable`). It ensures that the list of countries dynamically updates when a vote is submitted.
 * 
 * @component
 * @returns {JSX.Element} - The parent component that renders the vote submission form and the table of top-voted countries.
 */
const VoteApp: React.FC = () => {
  const [countries, setCountries] = useState([]); // State to store the list of top-voted countries

  /**
   * Fetches the top 10 voted countries when the component mounts.
   * The list is fetched from the backend service and stored in the `countries` state.
   */
  useEffect(() => {
    fetchTopVotedCountries(); // Calls the function to fetch the top-voted countries when the component mounts
  }, []);

  /**
   * Function to fetch the list of top-voted countries.
   * 
   * This function retrieves the data from the backend and updates the `countries` state with the new data.
   * It is passed as a prop to the `VoteForm` component, allowing the form to trigger a refresh of the list after a vote is submitted.
   * 
   * @async
   * @function fetchTopVotedCountries
   * @returns {Promise<void>} - Updates the state with the top-voted countries or logs an error if the request fails.
   */
  const fetchTopVotedCountries = async () => {
    try {
      const topCountries = await getTopVotedCountries(); // Fetches the top 10 voted countries from the backend
      setCountries(topCountries); // Updates the state with the fetched countries
    } catch (error) {
      console.error('Error fetching top voted countries:', error); // Logs an error if the fetch fails
    }
  };

  return (
    <div>
      {/* Renders the VoteForm component and passes the function to refresh the list of countries as a prop */}
      <VoteForm refreshCountries={fetchTopVotedCountries} />
      
      {/* Renders the CountryTable component with the list of countries */}
      <CountryTable countries={countries} />
    </div>
  );
};

export default VoteApp;
