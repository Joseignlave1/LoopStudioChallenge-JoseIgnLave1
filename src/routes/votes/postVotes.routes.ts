import { Router } from "express";
import { postVotes } from "../../controllers/votes/postVotes";

// This function configures the route for submitting a vote to the /votes endpoint.
export const postVotesRoutes = (routes:Router)=>{
    routes.post("/votes", postVotes);
}