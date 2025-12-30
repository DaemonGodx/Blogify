import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/db_config";
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';

function Home() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const userData = useSelector(state => state.auth.userData)
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back 👋
          </h1>
          <p className="text-gray-600">
            You are logged in successfully.
          </p>
        </div>
            </Container>
        </div>
    )
}

export default Home
