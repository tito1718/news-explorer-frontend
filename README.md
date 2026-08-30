# NewsExplorer

NewsExplorer is a responsive full-stack application that allows users to search for recent news articles and save them to a personal account. It was developed as the capstone project for the TripleTen Software Engineering program.

## Project links

- **Live application:** [Open NewsExplorer](https://tito-wtwr.crabdance.com/news-explorer/)
- **Frontend repository:** [news-explorer-frontend](https://github.com/tito1718/news-explorer-frontend)
- **Backend repository:** [news-explorer-api](https://github.com/tito1718/news-explorer-api)
- **Backend API:** [NewsExplorer API](https://api.tito-wtwr.crabdance.com/news-explorer)

## Features

- Search for articles published within the previous seven days using the News API
- Filter results that do not contain valid article or image URLs
- Remove cards when a remote image fails to load
- Display loading, request-error, and empty-result states
- Reveal three additional results at a time with the **Show more** button
- Open original articles in a new browser tab
- Register and sign in with a personal account
- Restore authenticated sessions using a stored JSON Web Token
- Protect the Saved News route from unauthenticated access
- Save articles persistently to MongoDB through the backend API
- Remove saved articles from the database
- Keep each user’s saved articles separate
- Handle expired sessions and failed API requests
- Validate registration and sign-in forms on the client
- Display server errors inside authentication forms
- Close dialogs with the close button, overlay, or Escape key
- Navigate between the Home and Saved News pages with React Router
- Adapt the interface and navigation for desktop, tablet, and mobile screens
- Provide accessible labels and controls for navigation, forms, and buttons
- Remove unwanted HTML tags from article descriptions

## Technologies

### Frontend

- React
- JavaScript
- CSS
- Vite
- React Router
- News API
- Web Storage API
- ESLint

### Backend and deployment

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- Nginx
- PM2
- Google Cloud
- Let’s Encrypt

## Routes

- `/` — news search and results
- `/saved-news` — the authenticated user’s saved articles

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

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_MAIN_API_URL=https://api.tito-wtwr.crabdance.com/news-explorer
```

The `.env.local` file is excluded from Git so private configuration values are not committed to the repository.

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

## Full-stack implementation

The frontend communicates with the NewsExplorer REST API for registration, authentication, current-user retrieval, and persistent saved-article operations.

The backend validates requests, hashes passwords, issues JSON Web Tokens, protects private routes, and stores users and articles in MongoDB. Production CORS settings restrict browser access to approved frontend origins.

Both applications are deployed on Google Cloud and served through Nginx over HTTPS.

## Project pitch video

[Watch the project pitch](https://www.loom.com/share/23251ea4a28740d4aec3684addb8ab80) for a demonstration of NewsExplorer and an explanation of the development process, challenges, responsible AI use, results, and possible future improvements.

## Author

**Cesar "Tito" Chirino**

Software Engineering graduate of the TripleTen program

- [GitHub](https://github.com/tito1718)
- [LinkedIn](https://www.linkedin.com/in/cesar-tito-chirino/)
