import Link from "next/link"
import { getBlogs } from "../services/blogs"

export default function Blogs() {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            <h3 style={{marginBottom: 5, textTransform: "uppercase"}}>{blog.title}</h3>
          </Link>
          <div>Author: {blog.author}</div>
          <div>Url: <a href={blog.url}>{blog.url}</a></div>
          <div>Likes: {blog.likes}</div>
          <hr />
        </div>
      ))}
    </div>
  )
}