import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MainCardProps {
  title: string;
  id : string;
  picture: string;

}

const MainCard: React.FC<MainCardProps> = ({ title, id, picture }) => {
  return (
    <div className="card card-compact w-96 bg-white shadow-xl">
        
            <figure><img src={picture} alt='cover' /></figure>
        
        <div className='card-body'>
            <h2 className='card-title' style={{font:'poppins'}}>
                {title}
            </h2>
        </div>
        <div className='card-actions justify-end p-4'>
            <Link href={`/blog2/${id}`}>
                <button className='flex justify-center w-[80px] border border-black rounded-md' style={{font:'poppins'}}>Open</button>
            </Link>
        </div>
    </div>
    
  );
};

export default MainCard;