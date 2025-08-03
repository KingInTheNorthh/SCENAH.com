import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  X,
  Plus,
  Tag,
  Calendar,
  Clock
} from 'lucide-react'
import { requireAuth } from '../utils/adminAuth'
import { 
  getStoryById, 
  getDraftById, 
  addStory, 
  updateStory, 
  addDraft, 
  updateDraft,
  publishDraft 
} from '../utils/storyStorage'
import ImageUpload from '../components/ImageUpload'

const StoryEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    image: '',
    readTime: '5 min read'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [isDraft, setIsDraft] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    if (!requireAuth(navigate)) return
    
    if (isEditing) {
      loadStory()
    }
  }, [id, navigate, isEditing])

  const loadStory = () => {
    setIsLoading(true)
    
    // Try to load as published story first
    let story = getStoryById(id)
    if (story) {
      setIsDraft(false)
    } else {
      // Try to load as draft
      story = getDraftById(id)
      setIsDraft(true)
    }
    
    if (story) {
      setFormData({
        title: story.title || '',
        excerpt: story.excerpt || '',
        content: story.content || '',
        category: story.category || '',
        tags: story.tags || [],
        image: story.image || '',
        readTime: story.readTime || '5 min read'
      })
      setOriginalData(story)
    }
    
    setIsLoading(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageChange = (imageUrl) => {
    handleInputChange('image', imageUrl)
  }

  const handleImageRemove = () => {
    handleInputChange('image', '')
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleContentChange = (content) => {
    const readTime = calculateReadTime(content)
    setFormData(prev => ({
      ...prev,
      content,
      readTime
    }))
  }

  const handleSave = async (publish = false) => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your story.')
      return
    }

    if (!formData.content.trim()) {
      alert('Please enter some content for your story.')
      return
    }

    setIsSaving(true)

    try {
      const storyData = {
        ...formData,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category.trim(),
        tags: formData.tags.filter(tag => tag.trim()),
        image: formData.image.trim()
      }

      if (isEditing) {
        if (isDraft && publish) {
          // Publishing a draft
          const publishedStory = publishDraft(parseInt(id))
          if (publishedStory) {
            navigate('/admin/dashboard')
            return
          }
        } else {
          // Updating existing story/draft
          const updateFunction = isDraft ? updateDraft : updateStory
          const updated = updateFunction(parseInt(id), storyData)
          if (updated) {
            navigate('/admin/dashboard')
            return
          }
        }
      } else {
        // Creating new story
        if (publish) {
          addStory(storyData)
        } else {
          addDraft(storyData)
        }
        navigate('/admin/dashboard')
        return
      }
    } catch (error) {
      console.error('Error saving story:', error)
      alert('Error saving story. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = () => {
    handleSave(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Story' : 'New Story'}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center justify-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors text-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="flex items-center justify-center px-4 py-2 bg-navy-600 hover:bg-navy-700 disabled:bg-navy-400 text-white font-medium rounded-lg transition-colors text-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-6 lg:gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Editor */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
            >
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  placeholder="Enter your story title..."
                />
              </div>

              {/* Excerpt */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  placeholder="A brief summary of your story..."
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                >
                  <option value="">Select a category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Poetry">Poetry</option>
                  <option value="Personal">Personal</option>
                  <option value="Travel">Travel</option>
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 sm:px-3 py-1 bg-navy-100 dark:bg-navy-900/30 text-navy-800 dark:text-navy-200 rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 sm:ml-2 text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    placeholder="Add a tag..."
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-3 sm:px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-6">
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={handleImageChange}
                  onImageRemove={handleImageRemove}
                  label="Featured Image"
                  placeholder="Upload an image or enter a URL"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  rows={16}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm sm:text-base"
                  placeholder="Write your story here..."
                />
                <div className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Read time: {formData.readTime}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Preview
                </h2>
                
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-32 sm:h-48 object-cover rounded-lg mb-6"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                )}

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {formData.title || 'Untitled Story'}
                </h1>

                {formData.excerpt && (
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                    {formData.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {formData.category && (
                    <span className="flex items-center">
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {formData.category}
                    </span>
                  )}
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {formData.readTime}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-relaxed">
                    {formData.content || 'Start writing your story...'}
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StoryEditor 