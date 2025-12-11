import React, { useEffect, useState } from "react";

const App = () => {
  const [blogData, setBlogData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const getData = async () => {
    const res = await fetch("http://localhost:5000/blogs");
    const data = await res.json();
    setBlogData(data);
    console.log(data);
  };
  const createBlog = async (newData) => {
    const res = await fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    getData();
  };

  const updateBlog = async (id, title, content) => {
    try {
      const res = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (res.ok) {
        getData();
      }
      return data;
    } catch (error) {
      alert(error);
    }
  };

  const deleteBlog = async (id) => {
    const res = await fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    });
    await res.json();
    if (res.ok) {
      getData(); // refresh UI
    } else {
      console.log("Delete failed");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBlog) {
      updateBlog(editingBlog.id, title, content);
      setShowMessage("Blog Updated");
      setShowToast(true);
    } else {
      createBlog({ title, content });
      setShowMessage("Blog Added");
      setShowToast(true);
    }

    // COMMON timeout for both cases
    setTimeout(() => {
      setShowMessage("");
      setShowToast(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-gray-50 ">
        <header className="flex justify-between items-center p-5 w-full  border-b border-gray-300 ">
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-4 shadow-md "
            >
              <h3 className="font-semibold text-[17px]">Create Post</h3>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="ring-1 ring-gray-400 py-2  px-3  outline-0 transition-all duration-300 hover:ring-blue-500 "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="content">Blog Content</label>
                <textarea
                  name="content"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
            <section className="flex flex-col gap-4">
              {blogData.map((blog, index) => (
                <div
                  key={blog.id}
                  className=" shadow-lg  p-6  flex flex-col gap-2  rounded-md"
                >
                  <h2 className=" font-semibold">{blog.title}</h2>
                  <p>{blog.content}</p>

                  <div className="flex gap-6 items-center  justify-between">
                    <span>{blog.publishedDate}</span>
                    <div className="flex gap-5">
                      <button
                        onClick={() => {
                          setShowForm(true);
                          setEditingBlog(blog);
                          setTitle(blog.title);
                          setContent(blog.content);
                        }}
                        className="px-6 py-1 opacity-75 bg-indigo-400 text-white  transition-all duration-200 hover:cursor-pointer shadow-md border-0  hover:opacity-100 active:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => deleteBlog(blog.id)}
                        onClick={() => {
                          setShowModal(true);

                          setDeleteID(blog.id);
                        }}
                        className="px-6 py-1 opacity-75 bg-rose-700 text-white transition-all duration-200 hover:cursor-pointer shadow-md border-0  hover:opacity-100 active:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </section>
        </main>
        {/* toast message */}
        {showToast && (
          <div className=" fixed  md:bottom-4 md:right-4 bg-blue-400 px-4 py-2 rounded-md text-white ">
            {showMessage}
          </div>
        )}
      </div>
      {/* modal */}
      {showModal && (
        <div className="fixed  inset-0 h-full w-full flex justify-center items-center  bg-black/50">
          <div className="flex flex-col gap-4 p-6 bg-white w-full max-w-[300px] justify-center items-center border-0  shadow-2xl rounded-md">
            <p>Are you sure?</p>
            <div className="flex gap-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-1 opacity-75 bg-indigo-400 text-white  transition-all duration-200 hover:cursor-pointer shadow-md border-0  hover:opacity-100 active:opacity-50"
              >
                Back
              </button>
              <button
                // data-id={blog.id}
                // onClick={() => deleteBlog(blog.id)}
                onClick={() => {
                  deleteBlog(deleteID);
                  // setShowForm(false);
                  setShowModal(false);
                  setShowToast(true);
                  setShowMessage("Blog Deleted");
                  setTimeout(() => {
                    setShowMessage("");
                    setShowToast(false);
                  }, 2000);
                }}
                className="px-6 py-1 opacity-75 bg-rose-700 text-white transition-all duration-200 hover:cursor-pointer shadow-md border-0  hover:opacity-100 active:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
          <div onClick={() => setShowModal(false)}>&times;</div>
        </div>
      )}
    </>
  );
};

export default App;
