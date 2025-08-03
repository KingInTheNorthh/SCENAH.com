// Migration utility to move existing stories to localStorage
import { stories as originalStories } from '../data/stories'
import { loadStories, saveStories } from './storyStorage'

export const migrateStories = () => {
  try {
    // Check if stories already exist in localStorage
    const existingStories = loadStories()
    
    if (existingStories.length === 0) {
      // No stories in localStorage, migrate the original ones
      console.log('Migrating original stories to localStorage...')
      
      // Convert the original stories to the new format
      const migratedStories = originalStories.map(story => ({
        ...story,
        createdAt: story.publishDate ? new Date(story.publishDate).toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }))
      
      // Save to localStorage
      const success = saveStories(migratedStories)
      
      if (success) {
        console.log(`Successfully migrated ${migratedStories.length} stories to localStorage`)
        return true
      } else {
        console.error('Failed to save migrated stories to localStorage')
        return false
      }
    } else {
      console.log('Stories already exist in localStorage, skipping migration')
      return true
    }
  } catch (error) {
    console.error('Error during story migration:', error)
    return false
  }
}

// Auto-migrate on import
migrateStories() 