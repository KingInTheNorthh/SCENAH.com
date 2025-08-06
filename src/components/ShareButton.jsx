import { useState } from 'react'
import { Share2, Copy, Check, X, MessageCircle, Instagram, Camera, Twitter, Facebook, Linkedin, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ShareButton = ({ story, className = "", size = "default" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentUrl = window.location.href
  const shareText = `Check out this amazing story: "${story.title}" `
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(currentUrl)

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedText}${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: `https://www.instagram.com/`,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      note: 'Copy link to share in Instagram'
    },
    {
      name: 'Snapchat',
      icon: Camera,
      url: `https://www.snapchat.com/`,
      color: 'bg-yellow-400 hover:bg-yellow-500 text-black',
      note: 'Copy link to share in Snapchat'
    },
    {
      name: 'Twitter/X',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ]

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

  const handleShare = (option, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (option.note) {
      // For Instagram and Snapchat, copy the link first
      copyToClipboard()
    }
    
    window.open(option.url, '_blank', 'width=600,height=400')
    setIsOpen(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleCopyUrl = (e) => {
    e.preventDefault()
    e.stopPropagation()
    copyToClipboard()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={`
          inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200
          ${getSizeClasses()}
          border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white
          ${className}
        `}
      >
        <Share2 className={`${getIconSize()} mr-2`} />
        Share Story
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Share Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Share this story
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Copy URL */}
                <div className="mb-4">
                  <button
                    onClick={handleCopyUrl}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-500 mr-3" />
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {copied ? 'Link copied!' : 'Copy link'}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Social Media Options */}
                <div className="grid grid-cols-2 gap-2">
                  {shareOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <button
                        key={option.name}
                        onClick={(e) => handleShare(option, e)}
                        className={`
                          flex items-center p-3 rounded-lg text-white text-sm font-medium transition-colors duration-200
                          ${option.color}
                        `}
                        title={option.note || `Share on ${option.name}`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span className="truncate">{option.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Note for Instagram and Snapchat */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  For Instagram and Snapchat, the link will be copied for you to paste
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShareButton
