'use client';

import Link from "next/link";
import { collection, addDoc, Firestore } from "firebase/firestore"; 
import { db, app } from "../../../firebase/firebase";
import { ChangeEvent, FormEvent, useState } from "react";



export default function createBlog() {
    const [formData, setFormData] = useState<{ title: string; body: string }>({
        title: "",
        body: "",
      });
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
       
        // Access Firestore through the Firebase app object
        const firestore = db
    
        try {
          // Get a reference to the "blogPosts" collection
          const blogPostsCollection = collection(firestore, "blogs");
    
          // Add the data to the "blogPosts" collection using addDoc
          await addDoc(blogPostsCollection, formData);
    
          alert("Blog post created successfully!");
          setFormData({ title: "", body: "" }); // Clear the form
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };
    
    

    return (
        <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">Blogger's Blog</h1>
        
        </header>
        <div>
            <h2>Create New Blog Post</h2>
        </div>

        <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', minHeight:'100vh', width:'90%'}}>
      
      <form >
        <div>
          <label>Title:</label>
          <input
            type="text"
            required
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded text-slate-300"
            style={{width:'100%', borderRadius:'5px'}}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            required
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded"
            style={{width:'150%', alignItems:'center', justifyContent:'center'}}
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        onClick={handleSubmit}>
            Create Post
        </button>
      </form>
    </div>
      </>
    )
  }
  