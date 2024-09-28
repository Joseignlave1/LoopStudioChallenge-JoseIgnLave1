import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './CountryTable.css';

interface CountryVote {
  country: {
    name: {
      common: string;
    };
    capital: string[];
    region: string; 
    subregion: string; 
  };
  votes: number; // The number of votes the country has received
}

interface CountryTableProps {
  countries: CountryVote[]; // Receives the array of countries and their votes as a prop
}

/**
 * CountryTable Component
 * 
 * The `CountryTable` component displays a table of the top-voted countries, including details like the country name, capital city, region, subregion, and the number of votes.
 * It also includes a search functionality to filter the displayed countries based on various criteria.
 * 
 * @component
 * @param {CountryTableProps} props - Receives an array of `CountryVote` objects which represent the countries and their respective vote counts.
 * @returns {JSX.Element} - A table displaying the top 10 voted countries with a search bar to filter the results.
 */
const CountryTable: React.FC<CountryTableProps> = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the user's search term

  /**
   * Filters the list of countries based on the user's search term.
   * 
   * The filter is case-insensitive and checks the country name, capital city, region, subregion, or the number of votes for a match.
   */

  const filteredCountries = countries.filter((country) => {
    const countryName = country.country.name?.common || ''; // Get the name of the country
    return (
      countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.country.capital[0] && country.country.capital[0].toLowerCase().includes(searchTerm.toLowerCase())) ||
      (country.country.region && country.country.region.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (country.country.subregion && country.country.subregion.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (country.votes.toString().includes(searchTerm.toLocaleLowerCase())) // Also allow filtering by number of votes
    );
  });

  return (
    <div className="country-card">
      <h3>Top 10 Most Voted Countries</h3>
      <div className="search-container">
        <input
          id="country-search"
          type="text"
          placeholder="Search Country, Capital City, Region, Subregion or votes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Updates the search term on input change
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </div>
      <div className="info-container">
        <table className="country-info">
          <thead>
            <tr>
              <th>Country</th>
              <th>Capital City</th>
              <th>Region</th>
              <th>Sub Region</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country, index) => (
              <tr key={index}>
                <td>{country.country.name.common}</td>
                <td>{country.country.capital[0]}</td>
                <td>{country.country.region}</td>
                <td>{country.country.subregion}</td>
                <td>{country.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
