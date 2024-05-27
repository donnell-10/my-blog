/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from 'next/image'
import Link from "next/link"
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // Import Firestore functions
import { db, app } from '../../firebase/firebase';
import { useEffect, useState } from "react";
import Navbar from '@/components/navbar';
import BlogCard from '@/components/BlogCard';
import MainCard from '@/components/MainCard';


interface Blog {
  id: string;
  title: string;
  picture: string;
}


export default function Home() {
  const [blogTitles, setBlogTitles] = useState<Blog[]>([]);
  const [randomBlog, setRandomBlog] = useState<Blog | null>(null);

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
        titles.push({ id: doc.id, title: data.title , picture:data.picture});
      });
      setBlogTitles(titles);

      // Randomly select a blog
      if (titles.length > 0) {
        const randomIndex = Math.floor(Math.random() * titles.length);
        setRandomBlog(titles[randomIndex]);
      }
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
        <div>  
            {randomBlog && (
              <div className='mb-8 flex ml-3'>
                <MainCard 
                  key={randomBlog.id} 
                  title={randomBlog.title} 
                  id={randomBlog.id} 
                  picture={randomBlog.picture} // Use a valid image URL
                />
              </div>
            )}
          <div className='flex justify-center'>
            <div className="carousel  w-3/4 p-4 space-x-4 rounded-box border border-black " style={{borderWidth:'2px'}}>
            
              {blogTitles.map((blog) => (
                <div className="carousel-item p-2">
                  <BlogCard key={blog.id} title={blog.title} id ={blog.id} />
                </div>
            
            
            ))}
         
              </div>   
          </div>

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