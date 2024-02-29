import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddBookChapters = () => {
  const params = useParams();
  const bkName = decodeURI(params.bkName);

  const [chp, setChp] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChp({
      ...chp,
      [name]: value,
    });
  };

  const addbookChp = (e) => {
    e.preventDefault();

    // console.log(chp);
    axios
      .post("http://localhost:3001/text-addbookchp", {
        bkName,
        title: chp.title,
        content: chp.content,
      })
      .then((res) => {
        alert(res.data.message);
        // if (res.data.status == "ok") navigate(`/test-chp/${book.bkname}`);
      });
  };
  return (
    <>
      <div className="bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Add Chapters</h1>
        <form onSubmit={addbookChp}>
          <input
            type="text"
            name="title"
            value={chp.title}
            onChange={handleChange}
            className="bg-gray-800 text-white px-3 py-2 mb-4 rounded-md w-full"
            placeholder="Chapter Title"
          />
          <textarea
            name="content"
            value={chp.content}
            onChange={handleChange}
            cols="30"
            rows="10"
            className="bg-gray-800 text-white px-3 py-2 mb-4 rounded-md w-full"
            placeholder="Chapter Content"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBookChapters;
