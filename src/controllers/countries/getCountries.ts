import { Request, Response } from "express";
import axios from "axios";
import fs from "fs";

const url = process.env.API_URL || "https://restcountries.com/v3.1/";

/**
 * Fetches the full list of countries from the REST API.
 * 
 * @function getCountriesList
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response with the full list of countries.
 */
export const getCountriesList = async (req: Request, res: Response) => {
    try {
        console.log("getCountriesList,", url);
        const response = await axios.get(`${url}all`);
        const countries = response.data;
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/**
 * Fetches country details such as name, capital, city, region, and subregion.
 * 
 * @function getCountriesDetails
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response with details for all countries.
 */
export const getCountriesDetails = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${url}all?fields=name,capital,city,region,subregion`);
        const countries = response.data;
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/**
 * Fetches the list of country names from the REST API.
 * 
 * @function getCountriesNames
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response with a sorted list of country names.
 */
export const getCountriesNames = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${url}all?fields=name`);
        const countries = response.data;
        const names = countries.map((country: any) => country?.name?.common).sort();
        res.status(200).json(names);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/**
 * Fetches the list of countries and their vote counts from a local JSON database, 
 * then combines that information with country details from the REST API. 
 * Returns the top 10 most voted countries.
 * 
 * @function getCountriesByVotes
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response with the top 10 countries sorted by votes.
 */
export const getCountriesByVotes = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${url}all?fields=name,capital,city,region,subregion`);
        const countries = response.data;
        const data = fs.readFileSync('database.json', 'utf8');
        const userVotes = JSON.parse(data);

        // Create an object to count votes per country
        const votosPorPais = userVotes.reduce((acumulador: { [key: string]: number }, voto: any) => {
            const pais = voto.country;
            acumulador[pais] = (acumulador[pais] || 0) + 1;
            return acumulador;
        }, {});

        // Convert the object to an array of objects with the desired format
        const paisesUnificados = Object.entries(votosPorPais).map(([country, votes]) => ({
            country,
            votes
        }));

        // Map unified countries with the corresponding country details
        const paisesConVotos = paisesUnificados.map((pais: any) => {
            const country = countries.find((country: any) => country?.name?.common === pais.country);
            return {
                country,
                votes: pais.votes
            };
        });

        // Sort the countries by votes in descending order and return the top 10
        const paisesConVotosOrdenados = paisesConVotos.sort((a: any, b: any) => b.votes - a.votes).slice(0, 10);
        res.status(200).json(paisesConVotosOrdenados);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error });
    }
}
