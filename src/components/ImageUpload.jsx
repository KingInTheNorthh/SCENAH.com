import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { handleImageUpload } from '../utils/imageUpload'

const ImageUpload = ({ 
  currentImage, 
  onImageChange, 
  onImageRemove,
  label = "Featured Image",
  placeholder = "Upload an image or enter a URL",
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [imageUrl, setImageUrl] = useState(currentImage || '')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (file) => {
    if (!file) return

    setIsUploading(true)
    setUploadError('')

    try {
      const result = await handleImageUpload(file)
      
      if (result.success) {
        setImageUrl(result.imageUrl)
        onImageChange(result.imageUrl)
      } else {
        setUploadError(result.error)
      }
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setImageUrl(url)
    onImageChange(url)
    setUploadError('')
  }

  const handleRemoveImage = () => {
    setImageUrl('')
    onImageChange('')
    onImageRemove && onImageRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Current Image Preview */}
      {imageUrl && (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
            onError={(e) => {
              e.target.style.display = 'none'
              setUploadError('Failed to load image. Please check the URL or try uploading again.')
            }}
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div className="space-y-3">
        {/* Drag and Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-navy-500 bg-navy-50 dark:bg-navy-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-navy-400 dark:hover:border-navy-500'
            }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />
          
          <div className="flex flex-col items-center space-y-2">
            {isUploading ? (
              <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isUploading ? (
                'Uploading image...'
              ) : (
                <>
                  <span className="font-medium text-navy-600 dark:text-navy-400">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                  <br />
                  <span className="text-xs">
                    PNG, JPG, GIF, or WebP (max 5MB)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* URL Input */}
        <div className="relative">
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            placeholder={placeholder}
            disabled={isUploading}
          />
          {imageUrl && (
            <button
              onClick={handleRemoveImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              title="Clear URL"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        You can upload an image from your device or paste an image URL from the web.
      </p>
    </div>
  )
}

export default ImageUpload
