import express from "express";
import dotenv from "dotenv";
import fs from 'fs';
import { app } from "./app";

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

let server = app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  }).on("error", (error) => {
    throw new Error(error.message);
  });

app.post('/createDB', (req, res) => {
  const fileName = 'database.json';
  
  fs.writeFile(fileName, '', (err) => {
    if (err) {
      console.error('Error creating the file:', err);
      res.status(500).send('Error creating the database');
    } else {
      console.log('Database file successfully created');
      res.status(200).send('Database successfully created');
    }
  });
});

export { server };
