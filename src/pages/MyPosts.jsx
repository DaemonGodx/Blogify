import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/db_config';
import { useSelector } from 'react-redux';
import { Query } from "appwrite"; 
function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        if (!userData) return;

        const queries = [
            Query.equal("UserId", userData.$id),
            Query.equal("status", "active")
        ];

        appwriteService.getPosts(queries).then((res) => {
            if (res) setPosts(res.rows);
        });
    }, [userData]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map(post => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;
