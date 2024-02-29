import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestAddBook = () => {
  const navigate = useNavigate();
  const uData = JSON.parse(window.localStorage.getItem("user"));
  console.log(uData.username);
  const [bkImage, setBkImage] = useState(null);
  const [book, setBook] = useState({
    bkname: "",
    role: "admin",
    authname: "",
    bkgenre: "",
    desp: "",
  });
  const options = [
    "Adventure",
    "Children's literature",
    "Fiction",
    "Historical Fiction",
    "Horror",
    "Humor",
    "Mythology",
    " Nonfiction",
    "Poetry",
    "Paranormal",
    "Romance",
    "Self Help",
    "Thriller",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  console.log(book, bkImage);
  const addbook = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("role", book.role);
    data.set("bkName", book.bkname);
    data.set("authName", uData.username);
    data.set("bkGenre", book.bkgenre);
    data.set("bkDesp", book.desp);
    data.set("bkImage", bkImage);

    axios.post("http://localhost:3001/test-addbooks", data).then((res) => {
      alert(res.data.message);
      if (res.data.status == "ok") navigate(`/test-chp/${book.bkname}`);
    });
  };
  return (
    <>
      <main className="main-bk">
        <div className="inbk">
          <div className="headbk">
            <img src="/assests/logoExplore.png" alt="Logo Image" />
            <span className="line">
              <h2>Upload a Book</h2>
            </span>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={addbook}
            className="input-form"
          >
            <div className="outbk">
              <div className="innerbk">
                <div className="inputbk">
                  <label htmlFor="bkname">Book Title</label>
                  <div className="input-flexbk">
                    <input
                      type="text"
                      name="bkname"
                      value={book.bkname}
                      required
                      placeholder="Enter book name"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="innerbk">
                <div className="inputbk">
                  <label htmlFor="bkimage">Book Cover Image</label>
                  <div className="input-flexbk">
                    <input
                      type="file"
                      name="bkImage"
                      // value={bkImg}
                      // required
                      accept=".jpg, .jpeg, .png"
                      placeholder="Book Image Cover"
                      onChange={(e) => setBkImage(e.target.files[0])}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="innerbk">
                <div className="innbk">
                  <div className="inputbk">
                    <label htmlFor="bkimage">Book Description</label>
                    <div className="input-flexbk">
                      <textarea
                        name="desp"
                        value={book.desp}
                        id="myTextarea"
                        rows={2} // Set the number of visible rows
                        cols={47} // Set the number of visible columns
                        placeholder="Write books Description" // Placeholder text
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="inputbk">
                    <label htmlFor="bkgenre">Book Genre</label>
                    <div className="dp-flexbk">
                      <select
                        id="dropdown"
                        name="bkgenre"
                        value={book.bkgenre}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="adbtn">
              <span>Add</span>
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default TestAddBook;
