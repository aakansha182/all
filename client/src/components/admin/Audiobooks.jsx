import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import "../../cStyles/admin.css";

const Audiobooks = () => {
  const [bookdata, setBookdata] = useState();
  const [bkByAdmin, setBkByAdmin] = useState([]);
  const [bkByUser, setBkByUser] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [bkDetail, setBkDetail] = useState();

  const fetchbooks = async () => {
    const bookColl = "audiobooks";

    try {
      axios.post("http://localhost:3001/get-audiobk", bookColl).then((res) => {
        const databook = res.data.data;
        // alert(res.data.message);
        setBookdata(databook);
        setBkByAdmin(databook.length);
        setBkByAdmin(
          databook.filter((audiobook) => audiobook.role === "admin")
        );
        setBkByUser(databook.filter((audiobook) => audiobook.role === "user"));
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
    console.log(bk?.audioBkName);
    axios
      .post("http://localhost:3001/delaudiobook", {
        audioBkName: bk?.audioBkName,
      })
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
                <th>Book Content</th>
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
                    <td>{i.audioBkName}</td>
                    <td>{i.audioAuthName}</td>
                    <td>{i.audioBkGenre}</td>
                    <td>{i.role}</td>
                    <td className="tbimg">{i.audioBkImage}</td>
                    <td className="tbdesp">{i.audioDesp}</td>
                    <td className="tbcon">{i.audioBkCon}</td>
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

export default Audiobooks;
export const BookDetail = (props) => {
  const { setEditOpen, bookDetail, fetchbooks } = props;
  const [book, setBook] = useState({
    audioBkName: "",
    audioAuthName: "",
    audioBkGenre: "",
    audioDesp: "",
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
  // const [selectedOption, setSelectedOption] = useState("");
  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const [audioBkImage, setaudioBkImage] = useState(null);
  const [audioBkCon, setaudioBkCon] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  // console.log(book);
  const editbook = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("audioBkName", bookDetail?.audioBkName);
    data.set("audioAuthName", book.audioAuthName);
    data.set("audioBkImage", audioBkImage);
    data.set("audioBkGenre", book.audioBkGenre);
    data.set("audioDesp", book.audioDesp);
    data.set("audioBkCon", audioBkCon);

    axios.post("http://localhost:3001/edit-audiobook", data).then((res) => {
      alert(res.data.message);
      if (res.data.status == "ok") {
        fetchbooks();
        setBook({
          audioBkName: "",
          audioAuthName: "",
          audioBkGenre: "",
          audioDesp: "",
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
          placeholder={bookDetail?.audioBkName ?? "book-name"}
        />
        <input
          type="text"
          className="w-[80%] h-[3rem] border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
          // disabled
          name="audioAuthName"
          value={book.audioAuthName}
          onChange={handleChange}
          placeholder={bookDetail?.audioAuthName ?? "book-author"}
        />
        <select
          id="dropdown"
          name="audioBkGenre"
          value={book.audioBkGenre}
          onChange={handleChange}
          className="w-[80%] h-[3rem] border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
        >
          <option value="" disabled>
            {bookDetail?.audioBkGenre ?? "book-genre"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <textarea
          rows={5}
          name="audioDesp"
          value={book.audioDesp}
          onChange={handleChange}
          className="w-[80%] h-auto border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
          placeholder={bookDetail?.audioDesp ?? "book-description"}
        ></textarea>
        <div className="w-[80%] h-[3rem] flex gap-2 border shadow-xl rounded-lg text-black p-2 bg-[#FAEBD7]">
          <span className="w-[50%]">Update Cover Image : </span>
          <input
            type="file"
            name="bkCon"
            accept=".jpg, .jpeg, .png"
            required
            placeholder="Add your books pdf"
            onChange={(e) => setaudioBkImage(e.target.files[0])}
            className="w-full h-full"
          ></input>
        </div>
        <div className="w-[80%] h-[3rem] flex gap-2 border shadow-xl rounded-lg text-black p-2 bg-[#FAEBD7]">
          <span className="w-[50%]">Update Content : </span>
          <input
            type="file"
            name="bkCon"
            accept=".m4a,.mp3"
            required
            placeholder="Add your books pdf"
            onChange={(e) => setaudioBkCon(e.target.files[0])}
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
