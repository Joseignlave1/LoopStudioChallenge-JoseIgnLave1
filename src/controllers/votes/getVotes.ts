import { Request, Response } from "express";
import fs from "fs";
import { UserVote } from "../../models/user.model";

/**
 * Retrieves all user votes from the local database file (database.json).
 * 
 * @function getVotes
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response containing the list of all votes.
 */

export const getVotes = async (req: Request, res: Response) => {
    try {
        const data = fs.readFileSync('database.json', 'utf8');
        const votes: UserVote[] = JSON.parse(data);
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/**
 * Retrieves the vote of a specific user by their email address from the local database file (database.json).
 * 
 * @function getVotesByUser
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response containing the vote for the user with the specified email.
 */

export const getVotesByUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;  // Extract the email from the URL parameters
        const data = fs.readFileSync('database.json', 'utf8');
        const votes = JSON.parse(data);
        const vote = votes.find((vote: UserVote) => vote.email === email); // Find the vote by email
        res.status(200).json(vote);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
