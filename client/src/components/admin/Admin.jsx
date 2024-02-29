import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Admin() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  //get data
  const [bookdata, setBookdata] = useState();
  const books = "books";
  const fetchbooks = async () => {
    const bookColl = books;

    try {
      axios
        .post("http://localhost:3001/get-dbcollections", bookColl)
        .then((res) => {
          const databook = res.data.data;
          setBookdata(databook.length);
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
  console.log(bookdata);
  //audio-data
  const [audiobookdata, setAudioBookdata] = useState();
  const fetchabooks = async () => {
    const bookColl = "audiobooks";

    try {
      axios.post("http://localhost:3001/get-audiobk", bookColl).then((res) => {
        const databook = res.data.data;
        // alert(res.data.message);
        setAudioBookdata(databook.length);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!audiobookdata) {
      fetchabooks();
    }
  }, []);
  console.log(audiobookdata);
  //user-data
  const [userdata, setUserdata] = useState();
  const fetchusers = async () => {
    const userColl = "users";

    try {
      axios.post("http://localhost:3001/get-dbuser", userColl).then((res) => {
        const datauser = res.data.data;
        // alert(res.data.message);
        setUserdata(datauser.length);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userdata) {
      fetchusers();
    }
  }, []);
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <a href="/admin/books">
          <div className="card">
            <div className="card-inner">
              <h3>Books</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>{bookdata}</h1>
          </div>
        </a>
        <a href="/admin/audiobooks">
          <div className="carda">
            <div className="card-inner">
              <h3>Audiobooks</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>{audiobookdata}</h1>
          </div>
        </a>
        <a href="/admin/customer">
          <div className="cardu">
            <div className="card-inner">
              <h3>Users</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{userdata}</h1>
          </div>
        </a>
        <div className="card">
          <div className="card-inner">
            <h3>Genre</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>8</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Admin;
