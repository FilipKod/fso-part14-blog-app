const blogs = [
  {
    id: 1,
    title: "title1",
    author: "author1",
    url: "https://google.com",
    likes: 5
  },
  {
    id: 2,
    title: "title2",
    author: "author2",
    url: "https://google.com",
    likes: 1
  },
  {
    id: 3,
    title: "title3",
    author: "author3",
    url: "https://google.com",
    likes: 12
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({
    id: nextId++,
    likes: 0,
    title,
    author,
    url
  })
}