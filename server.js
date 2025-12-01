
// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Store token in environment variable

app.get("/api/pinned", async (req, res) => {
  const query = `
    {
      user(login: "YOUR_GITHUB_USERNAME") {
        pinnedItems(first: 6) {
          edges {
            node {
              ... on Repository {
                name
                description
                url
                languages(first: 5) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  res.json(data);
});

