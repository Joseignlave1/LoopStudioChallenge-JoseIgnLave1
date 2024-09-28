import { Router } from "express";
import { getCountriesRoutes } from "./countries/getCountries.routes";
import { postVotesRoutes } from "./votes/postVotes.routes";
import { getVotesRoutes } from "./votes/getVotes.routes";
const router = Router();

getCountriesRoutes(router);
postVotesRoutes(router);
getVotesRoutes(router);
export default router;

