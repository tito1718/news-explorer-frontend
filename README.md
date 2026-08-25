# NewsExplorer

NewsExplorer is a responsive React application that allows users to search for recent news articles by topic and save articles to a personal collection. It was created as the final project for the TripleTen Software Engineering program.

## Project links

- **Live application:** Deployment link will be added after deployment
- **Repository:** [View the project on GitHub](https://github.com/tito1718/news-explorer-frontend)

## Features

- Search for articles published within the previous seven days using the News API
- Validate the search form before sending an API request
- Display loading, request-error, and empty-result states
- Reveal three additional results at a time with the **Show more** button
- Open original news articles in a new browser tab
- Simulate user registration, sign-in, sign-out, and token checking
- Save and remove articles from a personal collection
- Preserve the simulated user session and saved articles with `localStorage`
- Validate registration and sign-in forms on the client
- Close dialogs with the close button, overlay, or Escape key
- Navigate between the Home and Saved News pages with React Router
- Adapt the interface and navigation for desktop, tablet, and mobile screens
- Provide accessible labels and controls for navigation, forms, and buttons
- Remove unwanted HTML tags from article descriptions

## Technologies

- React
- JavaScript
- CSS
- Vite
- React Router
- News API
- Web Storage API (`localStorage`)
- ESLint

## Routes

- `/` — news search and results
- `/saved-news` — the signed-in user's saved articles

Unauthenticated users who attempt to access `/saved-news` are redirected to the home page.

## Run the project locally

### 1. Clone the repository

```bash
git clone https://github.com/tito1718/news-explorer-frontend.git
cd news-explorer-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the News API key

Create a `.env.local` file in the project root and add your News API key:

```env
VITE_NEWS_API_KEY=your_news_api_key
```

The `.env.local` file is excluded from Git so the API key is not committed to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open the local address displayed in the terminal, usually `http://localhost:5173/`.

## Available scripts

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create an optimized production build |
| `npm run lint`    | Check the source code with ESLint    |
| `npm run preview` | Preview the production build locally |

## Stage 1 implementation

This repository contains the Stage 1 frontend implementation of NewsExplorer. Authentication and saved-article operations are intentionally simulated in the browser using `localStorage`, allowing the complete interface to be reviewed before a backend is connected.

A later full-stack stage can replace the simulated behavior with server-side authentication, protected API routes, and persistent database storage.

## Project pitch video

[Watch the project pitch](https://www.loom.com/share/23251ea4a28740d4aec3684addb8ab80) for a demonstration of NewsExplorer and an explanation of the development process, challenges, responsible AI use, results, and possible future improvements.

## Author

**Cesar "Tito" Chirino**

TripleTen Software Engineering student

- [GitHub](https://github.com/tito1718)
- [LinkedIn](https://www.linkedin.com/in/cesar-tito-chirino/)
