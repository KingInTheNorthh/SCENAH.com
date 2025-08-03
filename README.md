# ReadingBlog - A Beautiful Reading Blog Website

A modern, responsive reading blog built with React, Vite, and Tailwind CSS. Features a beautiful landing page, animated story cards, dark/light mode toggle, and a complete reading experience.

## ✨ Features

- **Beautiful Landing Page** - Catchy hero section with animated elements
- **Animated Story Cards** - Hover effects and smooth animations using Framer Motion
- **Dark/Light Mode Toggle** - Persistent theme switching with system preference detection
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Story Categories** - Filter stories by category (Science Fiction, Fantasy, Romance, etc.)
- **Search Functionality** - Search through stories, tags, and categories
- **Author Page** - Beautiful about page with author information and stats
- **Story Detail Pages** - Full story reading experience with related stories
- **Modern UI/UX** - Clean, modern design with purple/pink gradient theme

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **PostCSS** - CSS processing

## 📦 Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Senabday
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎨 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation with theme toggle
│   └── StoryCard.jsx   # Animated story cards
├── contexts/           # React contexts
│   └── ThemeContext.jsx # Dark/light mode management
├── data/              # Static data
│   └── stories.js     # Story and author data
├── pages/             # Page components
│   ├── Home.jsx       # Landing page
│   ├── About.jsx      # Author page
│   ├── Stories.jsx    # All stories with filters
│   └── StoryDetail.jsx # Individual story page
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles and Tailwind
```

## 📚 Stories Included

The blog comes with 5 beautifully written placeholder stories:

1. **The Last Sunset** - Science Fiction about a world without darkness
2. **Whispers in the Garden** - Fantasy about communicating plants
3. **The Clockmaker's Daughter** - Steampunk time travel story
4. **The Library of Lost Dreams** - Magical realism about dream preservation
5. **The Last Letter** - Romance about hidden love letters

## 🎯 Key Features Explained

### Dark/Light Mode
- Toggle button in the navigation
- Remembers user preference in localStorage
- Automatically detects system preference on first visit
- Smooth transitions between themes

### Animated Cards
- Hover effects with scale and shadow changes
- Staggered animations when cards appear
- Smooth image zoom on hover
- Gradient overlays and category badges

### Responsive Design
- Mobile-first approach
- Collapsible navigation menu
- Responsive grid layouts
- Optimized typography for all screen sizes

### Search & Filter
- Real-time search through titles, excerpts, and tags
- Category filtering
- Combined search and filter functionality
- Clean, intuitive interface

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
The theme uses a purple/pink gradient. You can customize colors in:
- `tailwind.config.js` - Theme colors
- `src/index.css` - Custom CSS variables

### Content
- Edit `src/data/stories.js` to add/modify stories
- Update author information in the same file
- Replace placeholder images with your own

### Styling
- Modify `src/index.css` for global styles
- Update component-specific styles in each component file
- Customize Tailwind classes throughout the components

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy reading! 📖✨** 