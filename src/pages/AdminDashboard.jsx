import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar, 
  Tag, 
  Search,
  LogOut,
  BarChart3,
  BookOpen,
  Clock
} from 'lucide-react'
import { requireAuth, logoutAdmin } from '../utils/adminAuth'
import { 
  loadStories, 
  loadDrafts, 
  deleteStory, 
  deleteDraft,
  searchStories 
} from '../utils/storyStorage'

const AdminDashboard = () => {
  const [stories, setStories] = useState([])
  const [drafts, setDrafts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('published')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!requireAuth(navigate)) return
    
    loadData()
  }, [navigate])

  const loadData = () => {
    setIsLoading(true)
    const publishedStories = loadStories()
    const draftStories = loadDrafts()
    
    setStories(publishedStories)
    setDrafts(draftStories)
    setIsLoading(false)
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login')
  }

  const handleDeleteStory = (id) => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      deleteStory(id)
      loadData()
    }
  }

  const handleDeleteDraft = (id) => {
    if (window.confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
      deleteDraft(id)
      loadData()
    }
  }

  const filteredStories = searchQuery 
    ? searchStories(searchQuery)
    : stories

  const filteredDrafts = searchQuery
    ? drafts.filter(draft => 
        draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        draft.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : drafts

  const stats = {
    totalStories: stories.length,
    totalDrafts: drafts.length,
    totalWords: stories.reduce((acc, story) => acc + (story.content?.length || 0), 0),
    avgReadTime: stories.length > 0 
      ? Math.round(stories.reduce((acc, story) => acc + parseInt(story.readTime || '5'), 0) / stories.length)
      : 0
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Writer Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your stories and content
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base"
              >
                View Blog
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-navy-100 dark:bg-navy-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600 dark:text-navy-400" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Published</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStories}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-burgundy-100 dark:bg-burgundy-900/30 rounded-lg">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600 dark:text-burgundy-400" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Drafts</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDrafts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gold-100 dark:bg-gold-900/30 rounded-lg">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-gold-600 dark:text-gold-400" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Total Words</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalWords.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Avg Read Time</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.avgReadTime} min</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  />
                </div>
              </div>
              <Link
                to="/admin/story/new"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Story
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('published')}
              className={`px-4 sm:px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'published'
                  ? 'border-navy-500 text-navy-600 dark:text-navy-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Published ({stories.length})
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-4 sm:px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'drafts'
                  ? 'border-navy-500 text-navy-600 dark:text-navy-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Drafts ({drafts.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {activeTab === 'published' ? (
            <div className="p-4 sm:p-6">
              {filteredStories.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No stories yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start writing your first story to see it here.
                  </p>
                  <Link
                    to="/admin/story/new"
                    className="inline-flex items-center px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Write Your First Story
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStories.map((story) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                          {story.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {story.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {story.publishDate}
                          </span>
                          <span className="flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {story.category}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {story.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <Link
                          to={`/story/${story.id}`}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/story/edit/${story.id}`}
                          className="p-2 text-gray-400 hover:text-navy-600 dark:hover:text-navy-400"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteStory(story.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              {filteredDrafts.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No drafts yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start a new draft to work on your next story.
                  </p>
                  <Link
                    to="/admin/story/new"
                    className="inline-flex items-center px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Draft
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDrafts.map((draft) => (
                    <motion.div
                      key={draft.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                          {draft.title || 'Untitled Draft'}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {draft.excerpt || 'No excerpt available'}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(draft.createdAt).toLocaleDateString()}
                          </span>
                          {draft.category && (
                            <span className="flex items-center">
                              <Tag className="w-3 h-3 mr-1" />
                              {draft.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <Link
                          to={`/admin/story/edit/${draft.id}`}
                          className="p-2 text-gray-400 hover:text-navy-600 dark:hover:text-navy-400"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 