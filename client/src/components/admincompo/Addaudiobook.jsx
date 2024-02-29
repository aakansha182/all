import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../cStyles/admin.css";

const Addaudiobook = () => {
  const navigate = useNavigate();
  const [audioBkCon, setaudioBkCon] = useState(null);
  const [audioBkImage, setaudioBkImage] = useState(null);
  const [audiobook, setAudiobook] = useState({
    audioBkName: "",
    role: "admin",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAudiobook({
      ...audiobook,
      [name]: value,
    });
  };

  // console.log(audiobook, audioBkCon, audioBkImage);

  const addaudiobook = (e) => {
    e.preventDefault();

    const data = new FormData();

    if (
      audiobook.audioBkName &&
      audiobook.audioAuthName &&
      audiobook.role &&
      // audioBkImage &&
      audiobook.audioBkGenre &&
      audiobook.audioDesp
      // bkCon
    ) {
      data.set("audioBkName", audiobook.audioBkName);
      data.set("role", audiobook.role);
      data.set("audioAuthName", audiobook.audioAuthName);
      data.set("audioBkImage", audioBkImage);
      data.set("audioBkGenre", audiobook.audioBkGenre);
      data.set("audioDesp", audiobook.audioDesp);
      data.set("audioBkCon", audioBkCon);

      axios.post("http://localhost:3001/addaudiobook", data).then((res) => {
        alert(res.data.message);
        navigate("/admin/audiobooks");
      });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <main className="main-abk">
      <div className="inbk">
        <div className="headbk">
          <img src="/assests/logoExplore.png" alt="Logo Image" />
          <span className="line">
            <h2>Upload a Audiobook</h2>
          </span>
        </div>
        <form
          className="input-form"
          onSubmit={addaudiobook}
          encType="multipart/form-data"
        >
          <div className="outbk">
            <div className="innerbk">
              <div className="inputbk">
                <label htmlFor="audioBkName">Audiobook Title</label>
                <div className="input-flexbk">
                  <input
                    type="text"
                    name="audioBkName"
                    value={audiobook.audioBkName}
                    required
                    placeholder="Enter Audiobook name"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="inputbk">
                <label htmlFor="authname">Author Name</label>
                <div className="input-flexbk">
                  <input
                    type="text"
                    name="audioAuthName"
                    value={audiobook.audioAuthName}
                    required
                    placeholder="Author name"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="innerbk">
              <div className="inputbk">
                <label htmlFor="bkimage">Audiobook Cover Url</label>
                <div className="input-flexbk">
                  <input
                    type="file"
                    name="audioBkImage"
                    accept=".jpg, .jpeg, .png"
                    required
                    placeholder="Audiobook Image Url"
                    onChange={(e) => setaudioBkImage(e.target.files[0])}
                  ></input>
                </div>
              </div>
              <div className="inputbk">
                <label htmlFor="audioBkCon">Books Content</label>
                <div className="input-flexbk">
                  <input
                    type="file"
                    name="audioBkCon"
                    accept=".m4a,.mp3"
                    required
                    placeholder=" Add your books audio"
                    onChange={(e) => setaudioBkCon(e.target.files[0])}
                  ></input>
                </div>
              </div>
              {/* <div className="inputbk">
                <label htmlFor="audioBkGenre">Audiobook Genre</label>
                <div className="input-flexbk">
                  <input
                    type="file"
                    name="audioBkGenre"
                    value={audiobook.audioBkGenre}
                    required
                    placeholder="Audiobooks Category"
                    onChange={handleChange}
                  ></input>
                </div>
              </div> */}
            </div>
            <div className="innerbk">
              <div className="innbk">
                <div className="inputbk">
                  <label htmlFor="bkaudioDesp">Audiobook Description</label>
                  <div className="input-flexbk">
                    <textarea
                      name="audioDesp"
                      id="myTextarea"
                      value={audiobook.audioDesp}
                      rows={2} // Set the number of visible rows
                      cols={47} // Set the number of visible columns
                      placeholder="Write audiobooks Description" // Placeholder text
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="inputbk">
                  <label htmlFor="bkgenre">Audiobooks Genre</label>
                  <div className="dp-flexbk">
                    <select
                      id="dropdown"
                      name="audioBkGenre"
                      value={audiobook.audioBkGenre}
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
  );
};

export default Addaudiobook;
