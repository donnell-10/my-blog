'use client'

import Image from 'next/image'
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db, app } from '../../../../firebase/firebase';
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  body: string;
}


export default function BlogPost() {
  const searchParams = useSearchParams()
  const  id  = searchParams.get('id'); // Access the 'id' parameter from the URL

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
          }
        })
        .catch((error) => {
          console.error("Error fetching document: ", error);
        });
    }
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Blogger's Blog</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/createBlog"
        >
          New Blog
        </Link>
      </header>
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.body}</p>
      </div> 
      

    </>
  )
}