# NewsExplorer

NewsExplorer is a responsive React application that allows users to search for recent news articles and save articles to a personal collection.

This project is being developed as the final project for the TripleTen Web Developer program.

## Features

- Search for recent articles by keyword using a news API
- Display loading, request-error, and empty-result states
- Load additional results with the **Show more** button
- Save and remove articles
- Preserve saved articles using `localStorage`
- Simulated user registration, sign-in, and sign-out
- Client-side form validation
- Login, registration, and registration-success modals
- Close modals using the close button, overlay, or Escape key
- Responsive desktop, tablet, and mobile layouts
- Responsive mobile navigation menu
- Main and Saved News routes
- Accessible buttons, links, form fields, and navigation controls
- Remove unwanted HTML tags from article descriptions

## Technologies

- React
- JavaScript
- CSS
- Vite
- React Router
- News API
- Local Storage
- ESLint

## Routes

- `/` — main news-search page
- `/saved-news` — saved articles page

## Running the project locally

Clone the repository:

```bash
git clone https://github.com/tito1718/news-explorer-frontend.git
```

Move into the project directory:

```bash
cd news-explorer-frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed in the terminal, usually:

```text
http://localhost:5173/
```

## Available scripts

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Check the project with ESLint:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Current development stage

This repository contains the Stage 1 frontend implementation of NewsExplorer.

Authentication and saved-article behavior are currently simulated in the frontend using `localStorage`. A backend API, persistent database storage, and server-side authentication will be added during later development stages.

## Author

Cesar "Tito" Chirino — TripleTen Web Developer Program
