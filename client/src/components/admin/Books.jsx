import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
//import Loading from "../loading";

const Books = () => {
  const [bookdata, setBookdata] = useState();
  const [bkByAdmin, setBkByAdmin] = useState([]);
  const [bkByUser, setBkByUser] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [bkDetail, setBkDetail] = useState();

  const fetchbooks = async () => {
    const bookColl = "books";
    try {
      axios
        .post("http://localhost:3001/get-dbcollections", bookColl)
        .then((res) => {
          const databook = res.data.data; //data.data??
          // alert(res.data.message);
          setBookdata(databook);
          setBkByAdmin(databook.length);
          setBkByAdmin(databook.filter((book) => book.role === "admin"));
          setBkByUser(databook.filter((book) => book.role === "user"));
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!bookdata) {
      fetchbooks();
    }
  }, []);
  const adminCount = bkByAdmin.length;
  const userCount = bkByUser.length;

  const delbook = (bk) => {
    console.log(bk?.bkname);
    axios
      .post("http://localhost:3001/delbook", { bkname: bk?.bkname })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "del") {
          fetchbooks();
          // return (window.location.href = "/admin/books");
        }
      });
  };

  return (
    <div className="main-book relative overflow-hidden flex flex-col">
      <div className="bcards h-auto">
        <div className="bkcard">
          <h2>BOOKS UPLOADED BY ADMIN</h2>
          <h3>{adminCount}</h3>
        </div>
        <div className="bkcard">
          <h2>BOOKS UPLOADED BY USER</h2>
          <h3>{userCount}</h3>
        </div>
      </div>
      <h1 className="tbhead text-3xl -mb-10">Book Table</h1>
      <div className="scrollDi">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>By</th>
                <th>Book Cover</th>
                <th>Book Description</th>
                {/* <th>Book Content</th> */}
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {bookdata == undefined && <span>undefined</span>}
              {bookdata != undefined &&
                //  do both the line above will work
                bookdata.map((i) => (
                  <tr key={i._id}>
                    {/* <BooksCard i={i} /> */}
                    {/* what i is doing?? */}
                    <td>{i.bkName}</td>
                    <td>{i.authName}</td>
                    <td>{i.bkGenre}</td>
                    <td>{i.role}</td>
                    <td className="tbim">{i.bkImagePath}</td>
                    <td className="tbdesp">{i.bkDesp}</td>
                    {/* <td className="tbcon">{i.bkcon}</td> */}
                    <td>
                      <div className=" w-full h-auto p-8 flex flex-col justify-center gap-5 text-white">
                        <FaRegEdit
                          size={30}
                          onClick={() => {
                            setBkDetail(i);
                            setEditOpen(!editOpen);
                          }}
                          className="active:scale-90 cursor-pointer ease-in-out duration-200"
                        />
                        <AiTwotoneDelete
                          size={30}
                          onClick={() => {
                            // setBkDetail(i);
                            delbook(i);
                          }}
                          className="active:scale-90 cursor-pointer ease-in-out duration-200"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`${
          editOpen ? "opacity-100" : "opacity-0 hidden"
        } absolute mt-20 w-full h-full backdrop-blur-sm flex justify-center z-50`}
      >
        <BookDetail
          setEditOpen={setEditOpen}
          bookDetail={bkDetail}
          fetchbooks={fetchbooks}
        />
      </div>
    </div>
  );
};

export default Books;

export const BookDetail = (props) => {
  const { setEditOpen, bookDetail, fetchbooks } = props;
  const [book, setBook] = useState({
    bkname: "",
    authname: "",
    bkgenre: "",
    desp: "",
  });
  //dropdown list
  const options = [
    "Adventure",
    "Children's literature",
    "Fiction",
    "Historical Fiction",
    "Horror",
    "Humor",
    "Mythology",
    "Nonfiction",
    "Poetry",
    "Paranormal",
    "Romance",
    "Self Help",
    "Thriller",
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [bkCon, setBkCon] = useState(null);
  const [bkImg, setBkImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  const editbook = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("bkname", bookDetail?.bkname);
    data.set("authname", bookDetail?.authname);
    data.set("bkImg", bkImg);
    data.set("bkgenre", selectedOption);
    data.set("desp", book.desp);
    data.set("bkCon", bkCon);

    axios.post("http://localhost:3001/edit-book", data).then((res) => {
      alert(res.data.message);
      if (res.data.status == "ok") {
        fetchbooks();
        setBook({
          bkname: "",
          authname: "",
          bkgenre: "",
          desp: "",
        });
        setEditOpen(false);
      }
    });
  };
  return (
    <>
      <form className="relative w-[50%] h-[40rem] shadow-2xl rounded-xl flex flex-col gap-2 items-center justify-center border">
        <div
          onClick={() => setEditOpen(false)}
          className="absolute cursor-pointer w-auto h-auto text-2xl right-2 top-2 active:scale-90 ease-in-out duration-200"
        >
          X
        </div>
        <span className="text-4xl mb-2">Edit book details</span>
        <input
          type="text"
          className="w-[80%] h-[3rem] border shadow-xl rounded-lg placeholder:text-black text-black p-2"
          disabled
          placeholder={bookDetail?.bkname ?? "book-name"}
        />
        <input
          type="text"
          className="w-[80%] h-[3rem] border shadow-xl rounded-lg  placeholder:text-black text-black p-2"
          disabled
          placeholder={bookDetail?.authname ?? "book-author"}
        />
        {/* <input
          type="text"
          name="bkgenre"
          value={book.bkgenre}
          onChange={handleChange}
          className="w-[80%] h-[3rem] border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
          placeholder={bookDetail?.bkgenre ?? "book-genre"}
        /> */}

        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-[80%] h-[3rem] border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
        >
          <option value="" disabled>
            {bookDetail?.bkgenre ?? "book-genre"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <textarea
          rows={5}
          name="desp"
          value={book.desp}
          onChange={handleChange}
          className="w-[80%] h-auto border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
          placeholder={bookDetail?.desp ?? "book-description"}
        ></textarea>
        <div className="w-[80%] h-[3rem] flex gap-2 border shadow-xl rounded-lg text-black p-2 bg-[#FAEBD7]">
          <span className="w-[35%]">Update Cover Image : </span>
          <input
            type="file"
            name="bkCon"
            accept=".jpg, .jpeg, .png"
            required
            placeholder="Add your books pdf"
            onChange={(e) => setBkImg(e.target.files)}
            className="w-full h-full"
          ></input>
        </div>
        <div className="w-[80%] h-[3rem] flex gap-2 border shadow-xl rounded-lg text-black p-2 bg-[#FAEBD7]">
          <span className="w-[35%]">Update Content : </span>
          <input
            type="file"
            name="bkCon"
            accept=".pdf"
            required
            placeholder="Add your books pdf"
            onChange={(e) => setBkCon(e.target.files)}
            className="w-full h-full"
          ></input>
        </div>
        <button
          type="submit"
          onClick={editbook}
          className="w-[20%] h-[3rem] bg-primary mt-2 rounded-md hover:scale-110 active:scale-90 ease-in-out duration-200"
        >
          Update
        </button>
      </form>
    </>
  );
};
