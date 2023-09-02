'use client'

import Image from 'next/image'
import Link from "next/link"
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // Import Firestore functions
import { db, app } from '../../firebase/firebase';
import { useEffect, useState } from "react";


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
        <h2>Blog Titles</h2>
        <ul className="pl-4 cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
          {blogTitles.map((blog) => (
            <Link key={blog.id} href={`/blog2/${blog.id}`}>
              {blog.title}
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}
