'use client';

import Link from "next/link";
import { collection, addDoc, Firestore } from "firebase/firestore"; 
import { db, app } from "../../../firebase/firebase";
import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "@/components/navbar";



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
        <Navbar/>
        <div>
            <h2>Create New Blog Post</h2>
        </div>

    <div className="container flex justify-center items-center" style={{ width: '90%' }}>
      
      <form >
        <div className="text-center">
          <label>Title:</label>
          <input
            type="text"
            required
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
            style={{width:'100%', borderRadius:'5px'}}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <label>Body:</label>
          <textarea
            required
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded bg-transparent"
            style={{width:'150%', alignItems:'center', justifyContent:'center', minHeight: '300px'}}
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
  