# Meme Poster to Facebook

This project is a Node.js application that fetches a random meme from the **Meme Generator API** (`https://meme-api.com/gimme`) and posts it to a Facebook Page using the **Facebook Graph API**.

## Features

-   Fetches a random meme (image and caption) from the Meme Generator API.
-   Posts the meme to a Facebook Page, including the image and its caption.
-   Simple and lightweight Express.js server.

---

## Prerequisites

1. **Node.js and npm**: Install [Node.js](https://nodejs.org/) to run the server.
2. **Facebook App**:
    - Create a Facebook App via the [Facebook Developers Portal](https://developers.facebook.com/).
    - Generate a Page Access Token with the following permissions:
        - `pages_manage_posts`
        - `pages_read_engagement`
    - Obtain your **Facebook Page ID** and **Access Token**.
3. **Meme Generator API**: No additional setup is needed for this API.

---

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/meme-poster.git
    cd meme-poster
    npm install
    npm start
    ```

## Post Meme to Facebook

Do a `GET` request to `http://localhost:3000/api/facebook/` to post a random meme to your Facebook Page.

-   You can use this API endpoint with crontab to schedule the posting of memes at regular intervals.
