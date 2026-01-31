# Keto Cookbook 🍳🥑

Web app for creating and managing keto-friendly recipes with macros, photos, and video links.

## ✨ Features

- 🔐 Authentication (Firebase Auth)
- 📝 Create / Read / Update / Delete recipes
- 🖼️ Photo upload to Firebase Storage (with stored `photoPath`)
- 🧾 Ingredients and steps as lists (multiline input → array)
- 📊 Macros (kcal / proteins / fats / carbs)
- ⭐ Keto score (based on carbs)
- 🎥 Video support:
  - YouTube — embedded player inside recipe page
  - TikTok — opens as external link button
- 🔒 Edit/Delete доступен только автору рецепта
- 🔔 Toast notifications

## 🧰 Tech Stack

- Next.js (App Router)
- TypeScript
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- Custom Toast Provider

## 🚀 Getting Started

###

1. Install dependencies

```bash
npm install

```

2. Create .env.local

Create a .env.local file in the project root and add your Firebase config:

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

3. Run the project
   npm run dev

Open http://localhost:3000

🔥 Firebase Setup Notes
Firestore

Collection: recipes

Recipe document fields (example):

name (string)

description (string)

category ("meat" | "poultry" | "fish" | "dessert" | "vegetables" | "other")

time (number)

photo (string, download URL)

photoPath (string, storage path)

ingredients (string[])

steps (string[])

kcal ({ calories, proteins, fats, carbs })

url (string, optional video link)

authorId (string | null)

authorName (string | null)

createdAt (timestamp)

Storage

Images are uploaded to:
recipes/{userId}/{timestamp}\_{filename}

🎥 Video Links

Supported formats:

YouTube:

youtube.com/watch?v=...

youtu.be/...

youtube.com/shorts/...

TikTok:

tiktok.com/...

Behavior:

YouTube links are embedded directly on the recipe details page

TikTok links are displayed as a button that opens the video in a new tab

📦 Scripts

npm run dev — start local dev server

npm run build — build for production

npm run start — run production build

npm run lint — lint project

📌 Roadmap (optional)

Favorites

Filters (with/without video)

Search by name/ingredients

Pagination

👩‍💻 Author

Lobash Anastasiia
Front-End Developer
