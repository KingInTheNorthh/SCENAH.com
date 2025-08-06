// Likes storage utilities using localStorage
const LIKES_KEY = 'scenah_story_likes'

// Load likes data from localStorage
export const loadLikes = () => {
  try {
    const stored = localStorage.getItem(LIKES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return {}
  } catch (error) {
    console.error('Error loading likes:', error)
    return {}
  }
}

// Save likes data to localStorage
export const saveLikes = (likes) => {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
    return true
  } catch (error) {
    console.error('Error saving likes:', error)
    return false
  }
}

// Get likes count for a specific story
export const getStoryLikes = (storyId) => {
  const likes = loadLikes()
  return likes[storyId] || 0
}

// Check if user has liked a specific story
export const hasUserLiked = (storyId) => {
  const likes = loadLikes()
  return likes[`${storyId}_user_liked`] || false
}

// Toggle like for a story
export const toggleStoryLike = (storyId) => {
  const likes = loadLikes()
  const currentLikes = likes[storyId] || 0
  const userLiked = likes[`${storyId}_user_liked`] || false
  
  if (userLiked) {
    // Unlike
    likes[storyId] = Math.max(0, currentLikes - 1)
    likes[`${storyId}_user_liked`] = false
  } else {
    // Like
    likes[storyId] = currentLikes + 1
    likes[`${storyId}_user_liked`] = true
  }
  
  saveLikes(likes)
  return {
    likesCount: likes[storyId],
    userLiked: likes[`${storyId}_user_liked`]
  }
}

// Initialize default likes for stories (optional, for demo purposes)
export const initializeDefaultLikes = (stories) => {
  const likes = loadLikes()
  let hasChanges = false
  
  stories.forEach(story => {
    if (likes[story.id] === undefined) {
      // Set random initial likes between 5-50 for demo
      likes[story.id] = Math.floor(Math.random() * 46) + 5
      hasChanges = true
    }
  })
  
  if (hasChanges) {
    saveLikes(likes)
  }
}
