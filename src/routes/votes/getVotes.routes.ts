import { Router } from "express";
import { getVotes, getVotesByUser } from "../../controllers/votes/getVotes";

//This function configures the routes for the votes endpoints.
export const getVotesRoutes = (routes:Router)=>{
    routes.get("/votes", getVotes);
    routes.get("/votes/:email", getVotesByUser);
}