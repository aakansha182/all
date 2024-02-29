import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const AudiobookDetail = () => {
  const { audioBkName } = useParams();
  console.log(decodeURIComponent(audioBkName));

  const [bookDetail, setBookDetail] = useState();
  const [commentOpen, setCommentOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const fetchbooks = async () => {
    const bookColl = "audiobook";
    try {
      axios
        .post("http://localhost:3001/get-audiobk", bookColl)
        .then((res) => {
          const audioBkDetail = res.data.data;
          // console.log(res.data.message, audioBkDetail);
          setBookDetail(
            audioBkDetail.filter(
              (audiobook) =>
                audiobook.audioBkName === decodeURIComponent(audioBkName)
            )
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!bookDetail) {
      fetchbooks();
    }
  });
  //   // console.log(bookDetail && bookDetail[0]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setAudiobook({
  //       ...audiobook,
  //       [name]: value,
  //     });
  //   };

  // console.log(book);
  //   const editbook = (e) => {
  //     e.preventDefault();

  //     const data = new FormData();
  //     data.set("audioBkName", bookDetail[0]?.audioBkName);
  //     data.set("audioAuthName", bookDetail[0]?.audioAuthName);
  //     data.set("audioBkImage", audioBkImage);
  //     data.set("audioBkGenre", audiobook.audioBkGenre);
  //     data.set("audioDesp", audiobook.audioDesp);
  //     data.set("audioBkCon", audioBkCon);

  //     axios.post("http://localhost:3001/edit-book", data).then((res) => {
  //       alert(res.data.message);
  //       if (res.data.status == "ok") {
  //         fetchbooks();
  //         setBook({
  //           bkname: "",
  //           authname: "",
  //           bkgenre: "",
  //           desp: "",
  //         });
  //         setEditOpen(!editOpen);
  //       }
  //     });
  //   };
  //   const delbook = () => {
  //     axios
  //       .post("http://localhost:3001/delbook", { bkname: bookDetail[0]?.bkname })
  //       .then((res) => {
  //         alert(res.data.message);
  //         if (res.data.status == "del") {
  //           return (window.location.href = "/admin/books");
  //         }
  //       });
  //   };
  return (
    <>
      <div className="w-full h-auto bg-gray-200 dark:bg-neutral-900 dark:text-white duration-200  relative">
        {!bookDetail ? (
          <div className="w-full h-screen text-center text-3xl p-4">
            Loading...
          </div>
        ) : (
          <>
            {/* <div className="absolute w-full h-auto p-8 flex justify-end gap-5 text-white">
              <FaRegEdit
                size={30}
                onClick={() => setEditOpen(!editOpen)}
                className="active:scale-90 cursor-pointer ease-in-out duration-200"
              />
              <AiTwotoneDelete
                size={30}
                onClick={delbook}
                className="active:scale-90 cursor-pointer ease-in-out duration-200"
              />
            </div>
            <div
              className={`${
                editOpen ? "opacity-100" : "opacity-0 hidden"
              } absolute mt-20 w-full h-full backdrop-blur-sm flex justify-center z-50`}
            >
              <form className="w-[50%] h-[40rem] shadow-2xl rounded-xl flex flex-col gap-2 items-center justify-center border">
                <span className="text-4xl text-black mb-2">
                  Edit book details
                </span>
                <input
                  type="text"
                  className="w-[80%] h-[3rem] border shadow-xl rounded-lg  placeholder:text-black text-black p-2"
                  disabled
                  placeholder={bookDetail[0]?.bkname ?? "book-name"}
                />
                <input
                  type="text"
                  className="w-[80%] h-[3rem] border shadow-xl rounded-lg  placeholder:text-black text-black p-2"
                  disabled
                  placeholder={bookDetail[0]?.authname ?? "book-author"}
                />
                <input
                  type="text"
                  name="bkgenre"
                  value={book.bkgenre}
                  onChange={handleChange}
                  className="w-[80%] h-[3rem] border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
                  placeholder={bookDetail[0]?.bkgenre ?? "book-genre"}
                />
                <textarea
                  rows={5}
                  name="desp"
                  value={book.desp}
                  onChange={handleChange}
                  className="w-[80%] h-auto border shadow-xl rounded-lg bg-[#FAEBD7] placeholder:text-black text-black p-2 outline-none focus:scale-105"
                  placeholder={bookDetail[0]?.desp ?? "book-description"}
                ></textarea>
                <div className="w-[80%] h-[3rem] flex gap-2 border shadow-xl rounded-lg text-black p-2 bg-[#FAEBD7]">
                  <span className="w-[35%]">Update Cover Image : </span>
                  <input
                    type="file"
                    name="bkCon"
                    // value={bkCon}
                    accept=".jpg, .jpeg, .png"
                    required
                    placeholder="Add your books pdf"
                    onChange={(e) => setBkImg(e.target.files[0])}
                    className="w-full h-full"
                  ></input>
                </div>
                <div className="w-[80%] h-[3rem] flex gap-2 border shadow-xl rounded-lg text-black p-2 bg-[#FAEBD7]">
                  <span className="w-[35%]">Update Content : </span>
                  <input
                    type="file"
                    name="bkCon"
                    // value={bkCon}
                    accept=".pdf"
                    required
                    placeholder="Add your books pdf"
                    onChange={(e) => setBkCon(e.target.files[0])}
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
            </div> */}
            <div className="p-16">
              <div className="p-8 bg-white dark:bg-neutral-700  shadow-lg mt-24 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="text-center">
                    <div className="">
                      <p className="font-bold text-gray-700 dark:text-white text-xl">
                        0
                      </p>
                      <p className=" text-gray-500 dark:text-gray-100">
                        Comments
                      </p>
                      {/* <Link to={"#"} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 active:-translate-y-2 text-center">View Author Profile</Link> */}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-44 h-44 bg-indigo-100 mx-auto shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                      <img
                        src={bookDetail[0]?.audioBkImage ?? "img"}
                        alt=""
                        className="w-auto rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                    <Link
                      to={"#"}
                      className="text-white py-2 px-4 flex items-center justify-center uppercase rounded bg-blue-400 dark:bg-amber-500 hover:bg-blue-500 dark:hover:bg-amber-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 active:-translate-y-2"
                    >
                      View Author Profile
                    </Link>
                    <Link
                      to={bookDetail[0]?.audioBkCon ?? "book-content"}
                      target="_blank"
                      className="text-white flex items-center justify-center py-2 px-4 uppercase rounded bg-gray-700 dark:bg-orange-500 hover:bg-gray-800 dark:hover:bg-orange-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 active:-translate-y-2"
                    >
                      Read book
                    </Link>
                  </div>
                </div>
                <div className="mt-20 text-center border-b pb-12 capitalize">
                  <h1 className="text-4xl font-semibold text-gray-700 dark:text-white">
                    {bookDetail[0]?.audioBkName ?? "audiobook-name"}
                  </h1>
                  <p className="mt-4 text-gray-500 dark:text-gray-200">
                    {bookDetail[0]?.audioBkGenre ?? "book-genre"}
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-300">
                    Author : {bookDetail[0]?.audioAuthName ?? "book-author"}
                  </p>
                </div>
                <div className="mt-12 flex flex-col justify-center capitalize">
                  <p className="text-black text-center font-light lg:px-16 dark:text-white">
                    {bookDetail[0]?.audioDesp ?? "book-description"}
                  </p>
                  <button
                    onClick={() => setCommentOpen(!commentOpen)}
                    className="text-indigo-500 py-2 px-4 font-medium mt-4 dark:text-cyan-400"
                  >
                    Show comments
                  </button>
                </div>
              </div>
              <div
                className={`${commentOpen ? "opacity-100" : "opacity-0 hidden"
                  } ease-in-out duration-200 mt-5 h-auto shadow-xl flex flex-col gap-1 p-4 border rounded-lg bg-white dark:bg-neutral-700 dark:text-white dark:bg-opacity-20 text-black`}
              >
                <div className="w-full h-auto flex gap-10">
                  <div className="pfp w-[10%] h-[10rem] rounded-full bg-black text-primary flex items-center justify-center">
                    pfp
                  </div>
                  <div className="user w-[90%] h-[10rem] flex flex-col gap-2">
                    <div className="text-xl text-primary flex gap-2 justify-between">
                      <div className="name">name</div>
                      <div className="time">date & time</div>
                    </div>
                    <div className="text-xl">
                      msg - Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Debitis quo neque repudiandae tenetur quis quas
                      temporibus in vitae, perspiciatis laboriosam ab aliquam,
                      quidem, est ea! Ipsum tempora repudiandae ex nulla natus
                      quidem vitae, quam maxime eum sit illum earum dolorem
                      suscipit, nam aspernatur distinctio fugit recusandae rem,
                      obcaecati laborum iste!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AudiobookDetail;
