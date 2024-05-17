import React, { useEffect } from "react";

const Blogs = () => {
  useEffect(() => {
    document.title = "Blogs";
  }, []);
  return <h1>Blog Articles</h1>;
};

export default Blogs;