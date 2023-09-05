'use client';

import Link from "next/link";
import { doc, collection, addDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { db, app } from "../../../../firebase/firebase";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";

interface Blog {
    id: string;
    title: string;
    body: string;
  }


export default function editBlog() {
    const nav = useRouter()
    const pathname = usePathname()
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    const [blog, setBlog] = useState<Blog | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    useEffect(() => {
      if (id) {
        // Access Firestore through the Firebase app object
        const firestore = db;
  
        // Reference to the specific blog post document
        const blogPostRef = doc(firestore, "blogs", id.toString());
        
  
        // Fetch the blog post data
        getDoc(blogPostRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as Blog;
              setBlog(data);
              setBlog(data);
              setNewTitle(data.title);
              setNewBody(data.body);
            } else {
              // Handle the case where the document doesn't exist
              console.error("Blog post not found");
              nav.push('/')
            }
          })
          .catch((error) => {
            console.error("Error fetching document: ", error);
            nav.push('/')
          });
      }
    }, [id]);
    
    


    
    const handleSave = async (e:FormEvent) => {
        e.preventDefault()
        if (id && blog) {
            const firestore = db;
            const blogPostRef = doc(firestore, "blogs", id.toString());
        
            try {
              // Update the blog post document
              await updateDoc(blogPostRef, {
                title: newTitle,
                body: newBody,
              });
              
              console.log("Blog post updated successfully");
              nav.push(`/blog2/${blog.id}`); // Redirect back to the blog post page
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          }
        };
    
    

    return (
        <>
        <Navbar/>
        <div>
            <h2>Edit Blog Post</h2>
        </div>

    <div className="container flex justify-center items-center" style={{ width: '90%' }}>
      
      <form onSubmit={handleSave}>
        <div className="text-center">
          <label>Title:</label>
          <input
            type="text"
            required
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
            style={{width:'100%', borderRadius:'5px'}}
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            
          />
        </div>
        <div className="text-center">
          <label>Body:</label>
          <textarea
            required
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded bg-transparent"
            style={{width:'150%', alignItems:'center', justifyContent:'center', minHeight: '300px'}}
            name="body"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />
        </div>
        <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
            Update
        </button>
      </form>
    </div>
      </>
    )
  }
  