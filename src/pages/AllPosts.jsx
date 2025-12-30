import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/db_config';
import userService from '../appwrite/auth';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        appwriteService.getPosts([]).then((res) => {
            if (res && res.rows) {
                setPosts(res.rows);
            }
        }).catch((err) => {
            console.error("Error fetching posts:", err);
        });
    }, []); 

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

export default AllPosts;
