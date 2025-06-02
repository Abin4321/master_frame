// src/components/VideoPlayer.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
    const getVideoUrl = async () => {
      const { data, error } = await supabase
        .storage
        .from('videos')
        .getPublicUrl('test.mp4') // filename in bucket

      if (error) {
        console.error('Error fetching video:', error.message)
      } else {
        setVideoUrl(data.publicUrl)
      }
    }

    getVideoUrl()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {videoUrl ? (
        <video width="640" height="360" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  )
}

export default VideoPlayer
