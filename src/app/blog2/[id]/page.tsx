'use client'

import Image from 'next/image'
import Link from "next/link"
import { deleteDoc, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db, app } from '../../../../firebase/firebase';
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Navbar from '@/components/navbar';
import { error } from 'console';

interface Blog {
  id: string;
  title: string;
  body: string;
}


export default function BlogPost() {
  const nav = useRouter()
  const pathname = usePathname()
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  const [blog, setBlog] = useState<Blog | null>(null);
  console.log(id)
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog post?")){
      const firestore = db //access firestore through FB database object

      const blogPostRef = doc(firestore, "blogs", id.toString()); //ref to blog post doc
      deleteDoc(blogPostRef)
        .then(() => {
          alert("Blog post deleted.")
          nav.push('/');
        })
        .catch((error)=>{
          alert("Error deleting blog post")
          console.log("Error deleting document:", error)
        })
    }
  }

  const handleEdit = () => {
    nav.push(`/edit-blog/${id}`)
  }

  if (!blog) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <Navbar/>
      <div>
        <h2 className='text-7xl font-sans ml-4' >{blog.title}</h2>
        
      </div> 
      <div className='mt-5'>
        <p className='border ml-4 mr-4' style={{borderRadius:'5px'}}>
          {blog.body}
        </p>
      </div>
      <div className="flex gap-1 justify-end mr-4">
        <button className='mt-5 border border-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700' 
        onClick={handleEdit}>
          Edit
        </button>
        <button className='mt-5 ml-5 border border-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700'
        onClick={handleDelete}>
          Delete
        </button>
      </div>

    </>
  )
}