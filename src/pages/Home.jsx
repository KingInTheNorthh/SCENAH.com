import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Sparkles, Heart } from 'lucide-react'
import { loadStories } from '../utils/storyStorage'
import StoryCard from '../components/StoryCard'
import { useState, useEffect } from 'react'

const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [exploded, setExploded] = useState(false)
  
  const fullText = "I Write, You Read.\nWe both WIN"
  const typingSpeed = 100
  const pauseDuration = 2000
  const explosionDuration = 1000
  
  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, typingSpeed)
      
      return () => clearTimeout(timer)
    } else if (isTyping && currentIndex >= fullText.length) {
      // Finished typing, pause then explode
      const timer = setTimeout(() => {
        setIsTyping(false)
        setExploded(true)
      }, pauseDuration)
      
      return () => clearTimeout(timer)
    } else if (!isTyping && exploded) {
      // Explosion animation
      const timer = setTimeout(() => {
        setDisplayText('')
        setCurrentIndex(0)
        setIsTyping(true)
        setExploded(false)
      }, explosionDuration)
      
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isTyping, exploded, fullText])
  
  const renderText = () => {
    if (exploded) {
      return fullText.split('').map((char, index) => {
        // Find the position of "WIN" in the string
        const winStartIndex = fullText.indexOf('WIN')
        const isWinChar = index >= winStartIndex && index < winStartIndex + 3
        
        return (
          <motion.span
            key={index}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: [1, 2, 0], 
              opacity: [1, 0.8, 0],
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: index * 0.02
            }}
            className={isWinChar ? 'gradient-text' : ''}
          >
            {char === '\n' ? <br /> : char}
          </motion.span>
        )
      })
    }
    
    return displayText.split('').map((char, index) => {
      // Find the position of "WIN" in the string
      const winStartIndex = fullText.indexOf('WIN')
      const isWinChar = index >= winStartIndex && index < winStartIndex + 3
      
      return (
        <span 
          key={index}
          className={isWinChar ? 'gradient-text' : ''}
        >
          {char === '\n' ? <br /> : char}
        </span>
      )
    })
  }
  
  return (
    <div className="relative min-h-[4rem] md:min-h-[6rem] lg:min-h-[7rem]">
      {renderText()}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 bg-navy-600 dark:bg-navy-400 ml-1"
          style={{ height: '1em' }}
        />
      )}
    </div>
  )
}

const Home = () => {
  const [featuredStories, setFeaturedStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stories = loadStories()
    setFeaturedStories(stories.slice(0, 3))
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen">
             {/* Hero Section */}
       <section className="relative bg-gradient-to-br from-navy-50 via-burgundy-50 to-gold-50 dark:from-gray-900 dark:via-navy-900/20 dark:to-gray-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
                             <div className="inline-flex items-center px-4 py-2 bg-navy-100 dark:bg-navy-900/30 text-navy-800 dark:text-navy-200 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to Scenah.com
              </div>
            </motion.div>

                         <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
               <TypingAnimation />
             </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
Some stories spill out like confessions. Others sneak in, uninvited, wearing the mood I woke up with.
This blog isn't just a collection of thoughts — it's a mirror, sometimes foggy, sometimes painfully clear. The words here aren't always planned. They're pulled from moments that mattered, moods that lingered, and truths I didn't know I was ready to say. If you find pieces of yourself in them, good. That means they did their job.

            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                             <Link
                 to="/stories"
                 className="inline-flex items-center px-8 py-4 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
               >
                Explore Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
                             <Link
                 to="/about"
                 className="inline-flex items-center px-8 py-4 border-2 border-burgundy-600 text-burgundy-600 dark:text-burgundy-400 hover:bg-burgundy-600 hover:text-white font-semibold rounded-lg transition-all duration-200"
               >
                Meet the Author
                <Heart className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
                 <motion.div
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-20 left-10 text-navy-400 opacity-20"
         >
          <BookOpen className="w-12 h-12" />
        </motion.div>
                 <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-40 right-20 text-gold-400 opacity-20"
         >
          <Sparkles className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive into our most beloved tales, each crafted with care to inspire, 
              entertain, and leave you thinking long after the last word.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : featuredStories.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No stories yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check back soon for new stories!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StoryCard story={story} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
                         <Link
               to="/stories"
               className="inline-flex items-center px-6 py-3 border-2 border-burgundy-600 text-burgundy-600 dark:text-burgundy-400 hover:bg-burgundy-600 hover:text-white font-semibold rounded-lg transition-all duration-200"
             >
              View All Stories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

             {/* Stats Section */}
       <section className="py-20 bg-gradient-to-r from-navy-600 via-burgundy-600 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-white mb-2">{featuredStories.length > 0 ? featuredStories.length : 0}</div>
                             <div className="text-navy-100">Stories Published</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-white mb-2">125K+</div>
                             <div className="text-burgundy-100">Total Reads</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-white mb-2">12.5K</div>
                             <div className="text-gold-100">Happy Readers</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 