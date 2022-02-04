const Blog = ({ blog }) => (
  <>
    <div>
      {blog.title} {blog.author} {blog.likes}
    </div>
    <br />
  </>
)

export default Blog
