import { motion } from 'framer-motion'
import { MapPin, Mail, Twitter, Instagram, BookOpen, Heart, Users, Eye } from 'lucide-react'
import { author } from '../data/stories'

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
             {/* Hero Section */}
       <section className="py-20 bg-gradient-to-br from-navy-50 via-burgundy-50 to-gold-50 dark:from-gray-900 dark:via-navy-900/20 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <img
                src="/Scenah3.jpg"
                alt={author.name}
                                 className="w-32 h-32 rounded-full mx-auto border-4 border-navy-200 dark:border-navy-800 shadow-lg object-cover"
              />
                             <div className="absolute -bottom-2 -right-2 bg-navy-600 text-white p-2 rounded-full">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {author.name}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {author.location}
            </p>
            
            <div className="flex justify-center space-x-4 mb-8">
                             <a
                 href={`mailto:${author.social.email}`}
                 className="p-2 bg-navy-100 dark:bg-navy-900/30 text-navy-600 dark:text-navy-400 rounded-lg hover:bg-navy-200 dark:hover:bg-navy-900/50 transition-colors duration-200"
               >
                <Mail className="w-5 h-5" />
              </a>
                             <a
                 href={`https://twitter.com/${author.social.twitter.replace('@', '')}`}
                 className="p-2 bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-600 dark:text-burgundy-400 rounded-lg hover:bg-burgundy-200 dark:hover:bg-burgundy-900/50 transition-colors duration-200"
               >
                <Twitter className="w-5 h-5" />
              </a>
                                                           <a
                  href="https://www.instagram.com/mz_scenah?igsh=MWZzNW9ubjJuMzRsMw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 rounded-lg hover:bg-gold-200 dark:hover:bg-gold-900/50 transition-colors duration-200"
                >
                 <Instagram className="w-5 h-5" />
               </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              About Me
            </h2>
            
            {/* Newspaper-style layout with image and text wrap */}
            <div className="relative max-w-4xl mx-auto">
              {/* Large image on the left - responsive design */}
              <div className="float-left mr-4 md:mr-8 mb-4">
                <img
                  src="/Scenah3.jpg"
                  alt={author.name}
                  className="w-48 h-60 md:w-64 md:h-80 rounded-lg shadow-xl object-cover border-4 border-navy-200 dark:border-navy-800"
                />
              </div>
              
              {/* Text content that wraps around the image */}
              <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">
                  {author.bio}
                </p>
                
                <p className="mb-4">
                  But Sena is more than just spreadsheets and statements. She's a passionate writer, an avid reader, and a traveler at heart. Whether she's exploring bustling cities or quiet corners of the world, she finds inspiration in the people she meets and the places she sees. Sightseeing isn’t just a hobby—it’s her way of connecting with culture, history, and the unexpected beauty of everyday life.
                </p>
                
                <p className="mb-4">
                  When she’s not crunching numbers or crafting prose, you’ll likely find her curled up with a good book or laughing along to a classic sitcom. Her love for storytelling—whether through fiction, finance, or comedy—shapes the way she sees the world: with wit, warmth, and a keen sense of perspective.
                </p>
                
                <p>
                  Sena believes that life, like accounting, is about balance. And she’s committed to living hers with purpose, curiosity, and just the right dose of humor.
                </p>
              </div>
              
              {/* Clear the float */}
              <div className="clear-both"></div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
                         <div className="text-center p-6 bg-navy-50 dark:bg-navy-900/20 rounded-xl">
               <BookOpen className="w-8 h-8 text-navy-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {author.stats.storiesPublished}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Stories Published</div>
            </div>
            
                         <div className="text-center p-6 bg-burgundy-50 dark:bg-burgundy-900/20 rounded-xl">
               <Eye className="w-8 h-8 text-burgundy-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {author.stats.totalReads}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Reads</div>
            </div>
            
                         <div className="text-center p-6 bg-gold-50 dark:bg-gold-900/20 rounded-xl">
               <Users className="w-8 h-8 text-gold-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {author.stats.followers}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Followers</div>
            </div>
          </motion.div>

          {/* Writing Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
                         className="bg-gradient-to-r from-navy-600 via-burgundy-600 to-gold-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">My Writing Philosophy</h3>
                         <p className="text-navy-100 leading-relaxed">
              I believe that every story has the power to change a life. Whether it's a tale of 
              adventure that sparks the imagination, a romance that touches the heart, or a 
              mystery that challenges the mind, stories connect us to something greater than 
              ourselves. My goal is to create narratives that not only entertain but also inspire, 
              comfort, and provoke thought. Every word is written with love, every character 
              crafted with care, and every plot designed to take you on a journey you'll never forget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              I love hearing from readers! Whether you want to share your thoughts on a story, 
              ask a question, or just say hello, I'd be delighted to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <a
                 href={`mailto:${author.social.email}`}
                 className="inline-flex items-center px-6 py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors duration-200"
               >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
                             <a
                 href={author.website}
                 className="inline-flex items-center px-6 py-3 border-2 border-burgundy-600 text-burgundy-600 dark:text-burgundy-400 hover:bg-burgundy-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
               >
                Visit Website
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About 