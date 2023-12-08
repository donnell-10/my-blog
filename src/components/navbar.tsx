import Link from "next/link"

const Navbar = () => {
    return(      
        <header className="flex justify-between items-center mb-4 bg-black" 
        style={{width:'100%', border:'1px', borderRadius:'2px'}}>
            <h1 className="text-2xl p-4 text-white">
                <Link href='/'>Blogger's Blog</Link>
            </h1>
            <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 focus-within:bg-slate-700 outline-none mr-4"
            href="/createBlog"
            >
                New Blog
            </Link>
        </header>
    
    )
}


export default Navbar;