import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import StoryEditor from './pages/StoryEditor'
import './utils/migrateStories' // Import to run migration

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          {/* Admin routes - no navbar */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/story/new" element={<StoryEditor />} />
          <Route path="/admin/story/edit/:id" element={<StoryEditor />} />
          
          {/* Public routes - with navbar */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/story/:id" element={<StoryDetail />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App 