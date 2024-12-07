const express = require("express");
const { GiphyFetch } = require("@giphy/js-fetch-api");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Replace with your Giphy API key
const giphyApiKey = process.env.GIPHY_API_KEY;
const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN; // Facebook token for posting

const gf = new GiphyFetch(giphyApiKey);

// Function to fetch a random meme from Giphy
async function getRandomMeme() {
    try {
        const { data } = await gf.random({ tag: "meme", type: "gifs" });
        return data.images.original.url;
    } catch (error) {
        console.error("Error fetching meme from Giphy:", error.message);
        throw new Error("Failed to fetch meme from Giphy.");
    }
}

// Function to post meme on Facebook
async function postToFacebook(memeUrl) {
    try {
        const pageId = process.env.FACEBOOK_PAGE_ID; // Replace with your page ID
        const url = `https://graph.facebook.com/${pageId}/photos`;

        const response = await axios.post(url, {
            url: memeUrl,
            access_token: facebookAccessToken,
        });

        return response.data;
    } catch (error) {
        console.error("Error posting to Facebook:", error.response?.data || error.message);
        throw new Error("Failed to post meme to Facebook.");
    }
}

// API endpoint to fetch and post meme
app.get("/api/facebook/post", async (req, res) => {
    try {
        const memeUrl = await getRandomMeme();
        const facebookResponse = await postToFacebook(memeUrl);
        res.status(200).json({
            success: true,
            message: "Meme posted successfully on Facebook!",
            facebookResponse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
