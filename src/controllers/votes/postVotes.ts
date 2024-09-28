import { Request, Response } from "express";
import fs from "fs";
import { UserVote } from "../../models/user.model";

/**
 * Registers a new vote by saving it to the local database file (database.json).
 * 
 * This function validates the required fields (name, email, country).
 * It also ensures that the same user (by email) cannot vote more than once.
 * 
 * @function postVotes
 * @async
 * @param {Request} req - Express request object containing the vote information (name, email, country) in the body.
 * @param {Response} res - Express response object to return the result of the vote registration.
 * @returns {Promise<void>} Returns a JSON response with a success message if the vote is registered successfully, or an error message if the vote already exists or required data is missing.
 */
export const postVotes = async (req: Request, res: Response) => {
    try {
        const { name, email, country } = req.body;

        // Validate that all required fields are present
        if (!name || !email || !country) {
            return res.status(400).json({ error: "Missing required data" });
        }

        const voteData: UserVote = { name, email, country };

        // Read existing votes
        let votes = [];
        if (fs.existsSync('database.json')) {
            const data = fs.readFileSync('database.json', 'utf8');
            votes = JSON.parse(data);
        }

        // Check if the vote already exists based on the email
        const voteExists = votes.some((vote: any) => vote.email === email);
        if (voteExists) {
            return res.status(400).json({ error: "Vote already exists" });
        }

        // Add the new vote
        votes.push(voteData);

        // Save all updated votes
        fs.writeFileSync('database.json', JSON.stringify(votes), 'utf8');

        // Success response
        res.status(200).json({ message: "Vote successfully registered" });
    } catch (error) {
        console.error('Error in postVotes:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}
