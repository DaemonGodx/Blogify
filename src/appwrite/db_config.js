import config from '../config/config.js';
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, FeaturedImage, status, UserId }) {
        try {
            return await this.databases.createRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeaturedImage,
                    status,
                    UserId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updatePost(slug, { title, content, FeaturedImage, status }) {
        try {
            return await this.databases.updateRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeaturedImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

        }
        catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }
    async getPosts(quaries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listRows(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                quaries,
            )
        }
        catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false;
        }
    }
    async uploadFile(file) {
        try {
            return this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );

        }catch(error){
            console.log("Appwrite serive :: deleteFile :: error", error);
        }
    }
    async getFilePreview(fileId){
        try{
            return  this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        }catch(error){
            console.log("Appwrite serive :: getFilePreview :: error", error);
        }
    }
    getFileUrl(fileId) {
    if (!fileId) return null
    return `${config.appwriteUrl}/storage/buckets/${config.appwriteBucketId}/files/${fileId}/view?project=${config.appwriteProjectId}`
}

}
const service = new Service()
export default service;  