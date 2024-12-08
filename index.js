const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

// ENV Variables
const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;

async function fetchMeme() {
    try {
        const response = await axios.get("https://meme-api.com/gimme");
        const { url, title } = response.data;
        return { imageUrl: url, caption: title };
    } catch (error) {
        console.error("Error fetching meme from Meme Generator:", error.message);
        throw new Error("Failed to fetch meme from Meme Generator API.");
    }
}

// Function to post meme on Facebook
async function postToFacebook(metaUrl, caption) {
    try {
        const pageId = process.env.FACEBOOK_PAGE_ID;
        const url = `https://graph.facebook.com/${pageId}/photos`;

        const response = await axios.post(url, {
            url: metaUrl,
            caption: caption,
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
        const { imageUrl, caption } = await fetchMeme();
        const facebookResponse = await postToFacebook(imageUrl, caption);
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
