import React, { useEffect, useState } from "react";

const App = () => {
  const [blogData, setBlogData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/blogs");
      const data = await res.json();
      setBlogData(data);
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div className="w-full max-w-7xl mx-auto ">
      <header className="flex justify-between items-center p-5 w-full  border-b border-gray-300">
        <h1 className="text-2xl font-semibold">PureBlog</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-black text-white border-0 rounded-md shadow-md  opacity-80 hover:cursor-pointer hover:opacity-100 active:opacity-50 "
        >
          {showForm ? "close form" : " Create Post"}
        </button>
      </header>
      <main>
        {/* search bar */}

        <div className="w-full p-4">
          <input
            type="search"
            placeholder="Search Blogs ....."
            className="w-full  py-2  px-4 border-0 outline-0 ring-1  transition-all duration-300 hover:ring-2 hover:ring-blue-400 "
          />
        </div>

        <section
          className={`
    w-full p-4 overflow-hidden transition-all duration-300
    ${showForm ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 "}
  `}
        >
          <form className="flex flex-col gap-4 p-4 shadow-md ">
            <h3 className="font-semibold text-[17px]">Create Post</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Blog Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="ring-1 ring-gray-400 py-2  px-3  outline-0 transition-all duration-300 hover:ring-blue-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="content">Blog Content</label>
              <textarea
                name="content"
                placeholder="Content"
                className="ring-1 ring-gray-400 py-2  px-3 max-h-52 resize-x-none outline-0 transition-all duration-300 hover:ring-blue-500 "
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white border-0 rounded-md shadow-md  opacity-80 hover:cursor-pointer hover:opacity-100 active:opacity-50 "
              >
                Save
              </button>
            </div>
          </form>
        </section>

        {/* for blogs */}
        <section className="w-full p-4   ">
          <section>
            {blogData.map((blog, index) => (
              <div
                key={blog.id}
                className=" shadow-md p-6  flex flex-col gap-2 "
              >
                <h2 className=" font-semibold">{blog.title}</h2>
                <p>{blog.content}</p>

                <div className="flex gap-6 items-center  justify-between">
                  <span>Blog date</span>
                  <div className="flex gap-5">
                    <button
                      onClick={() => setShowForm(!showForm)}
                      className="px-6 py-1 opacity-75 bg-indigo-400 text-white  transition-all duration-200 hover:cursor-pointer shadow-md border-0  hover:opacity-100 active:opacity-50"
                    >
                      Edit
                    </button>
                    <button className="px-6 py-1 opacity-75 bg-rose-700 text-white transition-all duration-200 hover:cursor-pointer shadow-md border-0  hover:opacity-100 active:opacity-50">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </div>
  );
};

export default App;
