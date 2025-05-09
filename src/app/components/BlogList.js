import BlogCard from "./BlogCard";

const BlogList = () => {
  

  return (
    <>
      {blogPosts.map((post, index) => (
        <BlogCard key={index} {...post} />
      ))}
    </>
  );
};

export default BlogList;
