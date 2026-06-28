import { getBlogById } from "@/app/services/blogs"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function BlogDetail({
  params
}: { params: Promise<{id: string}> }) {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <span>{blog.author}</span>
      {" - "}
      <Link href={blog.url}>
        <span>{blog.url}</span>
      </Link>
      {" - "}
      <span>likes: {blog.likes}</span>
    </div>
  )
}