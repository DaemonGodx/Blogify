import React from 'react'
import appwriteService from "../appwrite/db_config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, FeaturedImage }) {
  const imageUrl = appwriteService.getFileUrl(FeaturedImage)

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className='rounded-xl' />
          ) : (
            <div className='w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center'>
              No Image
            </div>
          )}
        </div>
        <h2 className='text-xl font-bold'>Title: {title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
