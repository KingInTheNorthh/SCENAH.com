import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { toggleStoryLike, getStoryLikes, hasUserLiked } from '../utils/likesStorage'

const LikeButton = ({ storyId, className = "", showCount = true, size = "default" }) => {
  const [likesCount, setLikesCount] = useState(0)
  const [userLiked, setUserLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setLikesCount(getStoryLikes(storyId))
    setUserLiked(hasUserLiked(storyId))
  }, [storyId])

  const handleLike = (e) => {
    e.preventDefault() // Prevent navigation if inside a Link
    e.stopPropagation()
    
    setIsAnimating(true)
    const result = toggleStoryLike(storyId)
    
    setLikesCount(result.likesCount)
    setUserLiked(result.userLiked)
    
    setTimeout(() => setIsAnimating(false), 300)
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-2 text-sm"
      case "large":
        return "px-6 py-3 text-lg"
      default:
        return "px-4 py-2"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "small":
        return "w-4 h-4"
      case "large":
        return "w-6 h-6"
      default:
        return "w-5 h-5"
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 
        ${getSizeClasses()}
        ${userLiked 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-gray-100 hover:bg-red-50 dark:bg-gray-700 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${className}
      `}
      title={userLiked ? 'Unlike this story' : 'Like this story'}
    >
      <Heart 
        className={`
          ${getIconSize()} 
          ${showCount ? 'mr-2' : ''}
          ${userLiked ? 'fill-current' : ''}
          ${isAnimating ? 'animate-pulse' : ''}
        `} 
      />
      {showCount && (
        <span className={isAnimating ? 'animate-bounce' : ''}>
          {likesCount}
        </span>
      )}
    </button>
  )
}

export default LikeButton
