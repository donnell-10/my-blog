'use client'

import Image from 'next/image'
import Link from "next/link"
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // Import Firestore functions
import { db, app } from '../../firebase/firebase';
import { useEffect, useState } from "react";
import Navbar from '@/components/navbar';
import BlogCard from '@/components/BlogCard';


interface Blog {
  id: string;
  title: string;
}


export default function Home() {
  const [blogTitles, setBlogTitles] = useState<Blog[]>([]);

  useEffect(() => {
    // Access Firestore through the Firebase app object
    const firestore = db;

    // Reference to the "blogPosts" collection
    const blogPostsCollection = collection(firestore, "blogs");

    // Set up a real-time listener to fetch blog titles
    const unsubscribe = onSnapshot(blogPostsCollection, (snapshot) => {
      const titles: Blog[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        titles.push({ id: doc.id, title: data.title });
      });
      setBlogTitles(titles);
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []); // Run this effect only once (on component mount)

  
  return (
    <>
    <div>
      <Navbar></Navbar>
      <div className='container min-h-screen'>
        <h2 className="text-3xl font-semibold mb-4 ml-4 text-black">Today's Blogs</h2>
        <div className='flex'>
                  <ul className=" pl-6 flex gap-4">
        {blogTitles.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} id ={blog.id} />
        ))}

        </ul>
        </div>

      </div>
    </div>
    </>
  )
}

          // <li key={blog.id} className='mt-2 text-3xl ml-4'>
            //   <Link href={`/blog2/${blog.id}`}
            //   className="text-blue-600 hover:underline">
            //     {blog.title}
            //   </Link>
            // </li>