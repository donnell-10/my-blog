'use client'

import Image from 'next/image'
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db, app } from '../../../../firebase/firebase';
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Navbar from '@/components/navbar';

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

  if (!blog) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <Navbar/>
      <div>
        <h2 className='text-7xl font-sans' >{blog.title}</h2>
        
      </div> 
      <div className='mt-5'>
        <p>{blog.body}</p>
      </div>
      

    </>
  )
}