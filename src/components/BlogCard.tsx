import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  id : string

}

const BlogCard: React.FC<BlogCardProps> = ({ title, id }) => {
  return (
    <div className="card w-[194px] h-[214px] border border-black flex flex-col">
        <div className='p-2 flex flex-grow'>
        <h1>{title}</h1>
        </div>
        <div className='p-2 flex justify-center gap-3 '>
        <Link href={`/blog2/${id}`}>
            <button className='flex justify-center w-[80px] border border-black rounded-md'>Open</button>
        </Link>
            <button className=' flex justify-center w-[80px] border border-black rounded-md'>Delete</button>
            
        </div>
    </div>
  );
};

export default BlogCard;
