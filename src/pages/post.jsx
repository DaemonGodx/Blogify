import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/db_config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.UserId === userData.$id : false;
    const imageUrl = post?.FeaturedImage
        ? appwriteService.getFileUrl(post.FeaturedImage)
        : null;


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) return;

        // Delete the post row first
        const status = await appwriteService.deletePost(post.$id);

        if (status) {
            // Delete the image if it exists
            if (post.FeaturedImage) {
                try {
                    await appwriteService.deleteFile(post.FeaturedImage);
                    console.log("Image deleted successfully");
                } catch (err) {
                    console.error("Failed to delete image:", err);
                }
            }
            navigate("/");
        } else {
            console.error("Failed to delete post");
        }
    };
    


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {imageUrl ? (
                        <img src={imageUrl} alt={post.title} className='rounded-xl' />
                    ) : (
                        <div className='w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center'>
                            No Image
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}