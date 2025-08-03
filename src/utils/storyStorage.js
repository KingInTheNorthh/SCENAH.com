// Story storage utilities using localStorage
const STORIES_KEY = 'scenah_stories'
const DRAFTS_KEY = 'scenah_drafts'

// Load stories from localStorage or fallback to default data
export const loadStories = () => {
  try {
    const stored = localStorage.getItem(STORIES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // If no stored data, return empty array
    return []
  } catch (error) {
    console.error('Error loading stories:', error)
    return []
  }
}

// Save stories to localStorage
export const saveStories = (stories) => {
  try {
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories))
    return true
  } catch (error) {
    console.error('Error saving stories:', error)
    return false
  }
}

// Load drafts from localStorage
export const loadDrafts = () => {
  try {
    const stored = localStorage.getItem(DRAFTS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  } catch (error) {
    console.error('Error loading drafts:', error)
    return []
  }
}

// Save drafts to localStorage
export const saveDrafts = (drafts) => {
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts))
    return true
  } catch (error) {
    console.error('Error saving drafts:', error)
    return false
  }
}

// Add a new story
export const addStory = (story) => {
  const stories = loadStories()
  const newStory = {
    ...story,
    id: Date.now(), // Simple ID generation
    publishDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  }
  stories.unshift(newStory) // Add to beginning
  saveStories(stories)
  return newStory
}

// Update an existing story
export const updateStory = (id, updates) => {
  const stories = loadStories()
  const index = stories.findIndex(story => story.id === id)
  
  if (index !== -1) {
    stories[index] = {
      ...stories[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    saveStories(stories)
    return stories[index]
  }
  return null
}

// Delete a story
export const deleteStory = (id) => {
  const stories = loadStories()
  const filteredStories = stories.filter(story => story.id !== id)
  saveStories(filteredStories)
  return true
}

// Add a draft
export const addDraft = (draft) => {
  const drafts = loadDrafts()
  const newDraft = {
    ...draft,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }
  drafts.unshift(newDraft)
  saveDrafts(drafts)
  return newDraft
}

// Update a draft
export const updateDraft = (id, updates) => {
  const drafts = loadDrafts()
  const index = drafts.findIndex(draft => draft.id === id)
  
  if (index !== -1) {
    drafts[index] = {
      ...drafts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    saveDrafts(drafts)
    return drafts[index]
  }
  return null
}

// Delete a draft
export const deleteDraft = (id) => {
  const drafts = loadDrafts()
  const filteredDrafts = drafts.filter(draft => draft.id !== id)
  saveDrafts(filteredDrafts)
  return true
}

// Publish a draft (move from drafts to stories)
export const publishDraft = (draftId) => {
  const drafts = loadDrafts()
  const stories = loadStories()
  
  const draftIndex = drafts.findIndex(draft => draft.id === draftId)
  if (draftIndex === -1) return null
  
  const draft = drafts[draftIndex]
  const publishedStory = {
    ...draft,
    publishDate: new Date().toISOString().split('T')[0],
    publishedAt: new Date().toISOString()
  }
  
  // Remove from drafts
  drafts.splice(draftIndex, 1)
  saveDrafts(drafts)
  
  // Add to stories
  stories.unshift(publishedStory)
  saveStories(stories)
  
  return publishedStory
}

// Get story by ID
export const getStoryById = (id) => {
  const stories = loadStories()
  return stories.find(story => story.id === parseInt(id))
}

// Get draft by ID
export const getDraftById = (id) => {
  const drafts = loadDrafts()
  return drafts.find(draft => draft.id === parseInt(id))
}

// Search stories
export const searchStories = (query) => {
  const stories = loadStories()
  const lowercaseQuery = query.toLowerCase()
  
  return stories.filter(story => 
    story.title.toLowerCase().includes(lowercaseQuery) ||
    story.excerpt.toLowerCase().includes(lowercaseQuery) ||
    story.content.toLowerCase().includes(lowercaseQuery) ||
    story.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Get stories by category
export const getStoriesByCategory = (category) => {
  const stories = loadStories()
  return stories.filter(story => story.category === category)
}

// Get all categories
export const getAllCategories = () => {
  const stories = loadStories()
  const categories = [...new Set(stories.map(story => story.category))]
  return categories.sort()
}

// Get all tags
export const getAllTags = () => {
  const stories = loadStories()
  const allTags = stories.flatMap(story => story.tags)
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
} 