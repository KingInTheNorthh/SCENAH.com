/**
 * Image upload utility for handling local file uploads
 * Converts uploaded files to data URLs for client-side storage
 */

// Supported image formats
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Validates an uploaded image file
 * @param {File} file - The uploaded file
 * @returns {Object} - Validation result with success boolean and message
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { success: false, message: 'No file selected' }
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return { 
      success: false, 
      message: 'Unsupported file format. Please use JPEG, PNG, GIF, or WebP.' 
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      success: false, 
      message: 'File too large. Please use an image smaller than 5MB.' 
    }
  }

  return { success: true, message: 'File is valid' }
}

/**
 * Converts an uploaded file to a data URL
 * @param {File} file - The uploaded file
 * @returns {Promise<string>} - Promise that resolves to a data URL
 */
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * Generates a unique filename for an uploaded image
 * @param {string} originalName - Original filename
 * @returns {string} - Unique filename with timestamp
 */
export const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop().toLowerCase()
  return `image_${timestamp}_${randomString}.${extension}`
}

/**
 * Compresses an image file (basic quality reduction)
 * @param {File} file - The image file to compress
 * @param {number} quality - Compression quality (0.1 to 1.0)
 * @returns {Promise<string>} - Promise that resolves to compressed data URL
 */
export const compressImage = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (max 1200px width)
      const maxWidth = 1200
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      const newWidth = img.width * ratio
      const newHeight = img.height * ratio
      
      canvas.width = newWidth
      canvas.height = newHeight
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, newWidth, newHeight)
      const compressedDataURL = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedDataURL)
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image for compression'))
    }
    
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Handles the complete image upload process
 * @param {File} file - The uploaded file
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Upload result with imageUrl and metadata
 */
export const handleImageUpload = async (file, options = {}) => {
  try {
    // Validate file
    const validation = validateImageFile(file)
    if (!validation.success) {
      throw new Error(validation.message)
    }

    // Compress if needed (for large files)
    let imageDataURL
    if (file.size > 1024 * 1024) { // If larger than 1MB, compress
      imageDataURL = await compressImage(file, options.quality || 0.8)
    } else {
      imageDataURL = await fileToDataURL(file)
    }

    // Generate filename for reference
    const filename = generateUniqueFilename(file.name)

    return {
      success: true,
      imageUrl: imageDataURL,
      filename: filename,
      originalName: file.name,
      size: file.size,
      type: file.type
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}
