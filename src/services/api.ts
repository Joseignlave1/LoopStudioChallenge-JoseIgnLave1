import axios from 'axios';

// Base URL for the backend
const API_URL = 'http://localhost:3000';

/**
 * Fetches a list of country names from the backend.
 * 
 * This function sends a GET request to the `/countries/names` endpoint
 * of the backend to retrieve the names of all available countries.
 * 
 * @returns {Promise<string[]>} - A promise that resolves to an array of country names.
 * @throws {Error} - Throws an error if the request fails.
 */

export const getCountriesNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/countries/names`);
    return response.data; // Returns the list of country names
  } catch (error) {
    console.error('Error fetching country names:', error);
    throw error; // Re-throws the error to be handled by the caller
  }
};

/**
 * Fetches details of the top 10 most voted countries from the backend.
 * 
 * This function sends a GET request to the `/countries/votes` endpoint
 * to retrieve the countries that have received the most votes.
 * 
 * @returns {Promise<object[]>} - A promise that resolves to an array of the top 10 voted countries.
 * @throws {Error} - Throws an error if the request fails.
 */

export const getTopVotedCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/countries/votes`);
    return response.data; // Returns the list of top 10 countries by votes
  } catch (error) {
    throw error; // Re-throws the error to be handled by the caller
  }
};

/**
 * Submits a user's vote for a country.
 * 
 * This function sends a POST request to the `/votes` endpoint,
 * submitting the user's name, email, and the country they voted for.
 * 
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} country - The name of the country the user is voting for.
 * @returns {Promise<object>} - A promise that resolves to the backend's response after submitting the vote.
 * @throws {Error} - Throws an error if the vote submission fails.
 */

export const submitVote = async (name: string, email: string, country: string) => {
  try {
    const response = await axios.post(`${API_URL}/votes`, {
      name,
      email,
      country,
    });
    return response.data; // Returns the backend response after submitting the vote
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error; // Re-throws the error to be handled by the caller
  }
};
