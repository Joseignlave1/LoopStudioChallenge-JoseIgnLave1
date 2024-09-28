import { Router } from "express";
import { getCountriesList, getCountriesDetails, getCountriesNames, getCountriesByVotes } from "../../controllers/countries/getCountries";

//This function configures the routes for the country endpoints.
export const getCountriesRoutes = (routes:Router)=>{
    routes.get("/countries", getCountriesList);
    routes.get("/countries/details", getCountriesDetails);
    routes.get("/countries/names", getCountriesNames);
    routes.get("/countries/votes", getCountriesByVotes);
}
