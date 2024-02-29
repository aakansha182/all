import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import { writeFile } from "fs/promises";
import fs from "fs"; // Import fs for createWriteStream and other fs operations
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import PDFDocument from "pdfkit"; // Make sure to import PDFDocument if you're using it for PDF generation

dotenv.config();

// Adjust __dirname for ES Module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(
  //exp-proj-db in mongodb -> browser collection
  // process.env.MONGO_URL,
  // "mongodb+srv://exp:exp123@clusterexp.xw5sehz.mongodb.net/session-exp?retryWrites=true&w=majority",
  //"mongodb+srv://exp:explore@explorecluster.yweprwi.mongodb.net/expdb?retryWrites=true&w=majority",
    "mongodb+srv://exp:exp@cluster0.wpeuved.mongodb.net/session-exp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("\nDB connected");
  }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileimage: { type: String, required: false },
  role: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, required: true, default: false }, // Indicates premium status
  role2: { type: String, required: true, default: 'user' }, // New field for premium status
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

//Routes
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user_exists = await User.findOne({ email: email });
    if (user_exists) {
      if (password === user_exists.password) {
        const token = jwt.sign({ id: user_exists._id }, "jwt_secret_key", {
          expiresIn: "60m",
        });

        return res.send({
          message: "Login Successfull",
          status: "ok",
          token: token,
          user: user_exists,
        });
      } else {
        return res.send({ message: "Password didn't match" });
      }
    } else {
      return res.send({ message: "User not registered" });
    }
  } catch (error) {
    return res.send({
      message: "Something went wrong, Try again later",
      error: error,
    });
  }
});

app.post("/register", async (req, res) => {
  const { name, username, gender, dob, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.send({ message: "User is already registerd." });
    } else {
      const new_user = new User({
        name,
        role: "user",
        username,
        gender,
        dob,
        email,
        password,
      });
      new_user.save();
      return res.send({
        message: "Successfully Registered, Please login now.",
        status: "ok",
      });
    }
  } catch (error) {
    return res.send({ message: "Something went wrong, ty again later." });
  }
});

app.post("/forgortpassword", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ Status: "User not existed!" });
  }
  const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
    expiresIn: "5m",
  });
  const url = `http://localhost:5173/reset_password/${user._id}/${token}`;
  const emailHtml = `<h2>Click to reset password : ${url}</h2>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "it24img@gmail.com",
      pass: "fvfh msrl wuru ulkq",
    },
  });

  const options = {
    from: "it24img@gmail.com",
    to: email,
    subject: "Explore - Reset Password",
    html: emailHtml,
  };

  const emailSender = await transporter.sendMail(options);

  res.send({
    message: "Check your email",
    status: "ok",
    user: user,
    data: emailSender,
  });
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    try {
      const user_exists = await User.findOne({ _id: id });
      if (!user_exists) {
        return res.send({ message: "Invalid token or ID" });
      }
      user_exists.password = password;

      await user_exists.save();
      res.send({ message: "Password Reset done", status: "ok" });
    } catch (error) {
      return res.send({ error: error });
    }
  });
});

//audiobook
const bookSchema = new mongoose.Schema(
  {
    bkname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    authname: {
      type: String,
      required: true,
    },
    bkimage: {
      type: String,
      required: true,
    },
    bkgenre: {
      type: String,
      required: true,
    },
    desp: {
      type: String,
      required: true,
    },
    bkcon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = new mongoose.model("Book", bookSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/addbook",
  upload.fields([
    { name: "bkImg", maxCount: 1 },
    { name: "bkCon", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { bkname, role, authname, bkgenre, desp } = req.body;

      const bkImg = req.files["bkImg"] ? req.files["bkImg"][0] : null;
      const bkCon = req.files["bkCon"] ? req.files["bkCon"][0] : null;

      const bookInfo = await Book.findOne({ bkname: bkname });

      if (bookInfo) {
        return res.send({ message: "book already there!" });
      }

      let bkImgPath = "";
      let bkConPath = "";

      if (bkImg) {
        const bufferBkImg = bkImg.buffer;
        const bkImgPathPublic = `../client/public/users/bookCover/${
          bkname + "_" + bkImg.originalname
        }`;
        await writeFile(bkImgPathPublic, bufferBkImg);

        bkImgPath = `/users/bookCover/${bkname + "_" + bkImg.originalname}`;
      } else {
        bkImgPath = "/assets/logoExplore.png";
      }

      if (bkCon) {
        const bufferBkCon = bkCon.buffer;
        const bkConPathPublic = `../client/public/users/bookCon/${
          bkname + "_" + bkCon.originalname
        }`;
        await writeFile(bkConPathPublic, bufferBkCon);

        bkConPath = `/users/bookCon/${bkname + "_" + bkCon.originalname}`;
      } else {
        bkConPath = "noBookContent";
      }

      const book = new Book({
        bkname,
        role,
        authname,
        bkimage: bkImgPath,
        bkgenre,
        desp,
        bkcon: bkConPath,
      });

      book.save();
      return res.send({ message: "Book add Successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

app.post(
  "/edit-book",
  upload.fields([
    { name: "bkImg", maxCount: 1 },
    { name: "bkCon", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { bkname, authname, bkgenre, desp } = req.body;

      const bkImg = req.files["bkImg"] ? req.files["bkImg"][0] : null;
      const bkCon = req.files["bkCon"] ? req.files["bkCon"][0] : null;

      const bookInfo = await Book.findOne({ bkname: bkname });

      if (!bookInfo) {
        return res.send({ message: "book doesn't exists!" });
      }

      if (authname) bookInfo.authname = authname;
      if (bkgenre) bookInfo.bkgenre = bkgenre;
      if (desp) bookInfo.desp = desp;

      let bkImgPath = "";
      let bkConPath = "";

      if (bkImg) {
        const bufferBkImg = bkImg.buffer;
        const bkImgPathPublic = `../client/public/users/bookCover/${
          bkname + "_" + bkImg.originalname
        }`;
        await writeFile(bkImgPathPublic, bufferBkImg);

        bkImgPath = `/users/bookCover/${bkname + "_" + bkImg.originalname}`;
        bookInfo.bkimage = bkImgPath;
      }

      if (bkCon) {
        const bufferBkCon = bkCon.buffer;
        const bkConPathPublic = `../client/public/users/bookCon/${
          bkname + "_" + bkCon.originalname
        }`;
        await writeFile(bkConPathPublic, bufferBkCon);

        bkConPath = `/users/bookCon/${bkname + "_" + bkCon.originalname}`;
        bookInfo.bkcon = bkConPath;
      }

      await bookInfo.save();
      // const book = new Book({
      //   bkname,
      //   authname,
      //   bkimage: bkImgPath,
      //   bkgenre,
      //   desp,
      //   bkcon: bkConPath,
      // });
      return res.send({ message: "Book edited Successfully!", status: "ok" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

const delBookSchema = new mongoose.Schema(
  {
    bkname: {
      type: String,
      required: true,
    },
    authname: {
      type: String,
      required: true,
    },
    bkimage: {
      type: String,
      required: true,
    },
    bkgenre: {
      type: String,
      required: true,
    },
    desp: {
      type: String,
      required: true,
    },
    bkcon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DelBook = new mongoose.model("DelBook", delBookSchema);

app.post("/delbook", async (req, res) => {
  try {
    const { bkname } = req.body;
    // console.log(bkname);
    const bookExist = await Book.findOne({ bkname: bkname });

    if (!bookExist) {
      return res.send({ message: "book doesn't exists!" });
    }

    const delbook = new DelBook({
      bkname: bookExist.bkname,
      authname: bookExist.authname,
      bkimage: bookExist.bkimage,
      bkgenre: bookExist.bkgenre,
      desp: bookExist.desp,
      bkcon: bookExist.bkcon,
    });

    await delbook.save();

    await Book.deleteOne({ bkname });

    return res.send({ message: "book deleted successfully !", status: "del" });
  } catch (error) {
    console.log(error);
  }
});

//audiobook
const audiobookSchema = new mongoose.Schema(
  {
    audioBkName: {
      type: String,
      required: true,
    },
    audioAuthName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    audioBkImage: {
      type: String,
      required: true,
    },
    audioBkGenre: {
      type: String,
      required: true,
    },
    audioDesp: {
      type: String,
      required: true,
    },
    audioBkCon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Audiobook = new mongoose.model("Audiobook", audiobookSchema);

app.post(
  "/addaudiobook",
  upload.fields([
    { name: "audioBkImage", maxCount: 1 },
    { name: "audioBkCon", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { audioBkName, audioAuthName, audioBkGenre, audioDesp, role } =
        req.body;

      const audioBkImage = req.files["audioBkImage"]
        ? req.files["audioBkImage"][0]
        : null;
      const audioBkCon = req.files["audioBkCon"]
        ? req.files["audioBkCon"][0]
        : null;

      const audiobookInfo = await Audiobook.findOne({
        audioBkName: audioBkName,
      });

      if (audiobookInfo) {
        return res.send({ message: "book already there!" });
      }

      let audioBkImagePath = "";
      let audioBkConPath = "";
      // console.log(audioBkImage, audioBkCon);

      if (audioBkImage && audioBkImage.originalname) {
        const bufferaudioBkImage = audioBkImage.buffer;
        const audioBkImagePathPublic = `../client/public/users/audioBookCover/${
          audioBkName + "_" + audioBkImage.originalname
        }`; //why is ` used??
        await writeFile(audioBkImagePathPublic, bufferaudioBkImage);

        audioBkImagePath = `/users/audioBookCover/${
          audioBkName + "_" + audioBkImage.originalname
        }`;
      } else {
        audioBkImagePath = "/assets/logoExplore.png";
      }
      // why is audioBkCon.originalname used ??
      if (audioBkCon && audioBkCon.originalname) {
        const bufferaudioBkCon = audioBkCon.buffer;
        const audioBkConPathPublic = `../client/public/users/audioBookCon/${
          audioBkName + "_" + audioBkCon.originalname
        }`;
        await writeFile(audioBkConPathPublic, bufferaudioBkCon);

        audioBkConPath = `/users/audioBookCon/${
          audioBkName + "_" + audioBkCon.originalname
        }`;
      } else {
        audioBkConPath = "noBookContent";
      }

      const audiobook = new Audiobook({
        audioBkName,
        audioAuthName,
        role,
        audioBkImage: audioBkImagePath,
        audioBkGenre,
        audioDesp,
        audioBkCon: audioBkConPath,
      });

      audiobook.save();
      return res.send({ message: "Audio Book add Successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);
app.post("/get-audiobk", async (req, res) => {
  const { audiobooks } = await req.body;
  console.log(audiobooks);
  try {
    // if (books == "books") {
    const audiobookInfo = await Audiobook.find({}); //Book is from where is it from database (user)

    if (!audiobookInfo) {
      return res.send({ message: "No book in DB!" });
    }
    // console.log(bookInfo);
    return res.send({ message: "Data found", data: audiobookInfo }); // data used from and where
    // }
  } catch (error) {
    console.log(error);
  }
});

// get user details
app.post("/get-dbuser", async (req, res) => {
  const { users } = await req.body;
  console.log(users);
  try {
    // if (books == "books") {
    const userInfo = await User.find({}); //Book is from where is it from database (user)

    if (!userInfo) {
      return res.send({ message: "No book in DB!" });
    }
    console.log(userInfo);
    return res.send({ message: "Data found", data: userInfo }); // data used from and where
    // }
  } catch (error) {
    console.log(error);
  }
});

app.post("/get-dbcollections", async (req, res) => {
  const { books } = await req.body;
  console.log(books);
  try {
    // if (books == "books") {
    const bookInfo = await TBook.find({});

    if (!bookInfo) {
      return res.send({ message: "No book in DB!" });
    }
    // console.log(bookInfo);
    return res.send({ message: "Data found", data: bookInfo });
    // }
  } catch (error) {
    console.log(error);
  }
});

//edit-audiobooks
app.post(
  "/edit-audiobook",
  upload.fields([
    { name: "audioBkImage", maxCount: 1 },
    { name: "audioBkCon", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { audioBkName, audioAuthName, audioBkGenre, audioDesp } = req.body;

      const audioBkImage = req.files["audioBkImage"]
        ? req.files["audioBkImage"][0]
        : null;
      const audioBkCon = req.files["audioBkCon"]
        ? req.files["audioBkCon"][0]
        : null;

      const audiobookInfo = await Audiobook.findOne({
        audioBkName: audioBkName,
      });

      if (!audiobookInfo) {
        return res.send({ message: "book doesn't exists!" });
      }

      // console.log(
      //   audioBkName,
      //   audioAuthName,
      //   audioBkGenre,
      //   audioDesp,
      //   audioBkImage,
      //   audioBkCon
      // );

      if (audioAuthName) audiobookInfo.audioAuthName = audioAuthName;
      if (audioBkGenre) audiobookInfo.audioBkGenre = audioBkGenre;
      if (audioDesp) audiobookInfo.audioDesp = audioDesp;

      let audioBkImagePath = "";
      let audioBkConPath = "";

      if (audioBkImage && audioBkImage.originalname) {
        const bufferaudioBkImage = audioBkImage.buffer;
        const audioBkImagePathPublic = `../client/public/users/audioBookCover/${
          audioBkName + "_" + audioBkImage.originalname
        }`; //why is ` used??
        await writeFile(audioBkImagePathPublic, bufferaudioBkImage);

        audioBkImagePath = `/users/audioBookCover/${
          audioBkName + "_" + audioBkImage.originalname
        }`;
        audiobookInfo.audioBkImage = audioBkImagePath;
      }

      if (audioBkCon && audioBkCon.originalname) {
        const bufferaudioBkCon = audioBkCon.buffer;
        const audioBkConPathPublic = `../client/public/users/audioBookCon/${
          audioBkName + "_" + audioBkCon.originalname
        }`;
        await writeFile(audioBkConPathPublic, bufferaudioBkCon);

        audioBkConPath = `/users/audioBookCon/${
          audioBkName + "_" + audioBkCon.originalname
        }`;
        audiobookInfo.audioBkCon = audioBkConPath;
      }

      await audiobookInfo.save();

      return res.send({
        message: "Audiobook edited Successfully!",
        status: "ok",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

//delete Audiobook
const delAudiobookSchema = new mongoose.Schema(
  {
    audioBkName: {
      type: String,
      required: true,
    },
    audioAuthName: {
      type: String,
      required: true,
    },
    audioBkImage: {
      type: String,
      required: true,
    },
    audioBkGenre: {
      type: String,
      required: true,
    },
    audioDesp: {
      type: String,
      required: true,
    },
    audioBkCon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DelAudiobook = new mongoose.model("DelAudiobook", delAudiobookSchema);

app.post("/delaudiobook", async (req, res) => {
  try {
    const { audioBkName } = req.body;
    console.log(audioBkName);
    const audiobookExist = await Audiobook.findOne({
      audioBkName: audioBkName,
    });
    console.log(audiobookExist);
    if (!audiobookExist) {
      return res.send({ message: "book doesn't exists!" });
    }

    const delaudiobook = new DelAudiobook({
      audioBkName: audiobookExist.audioBkName,
      audioAuthName: audiobookExist.audioAuthName,
      audioBkImage: audiobookExist.audioBkImage,
      audioBkGenre: audiobookExist.audioBkGenre,
      audioDesp: audiobookExist.audioDesp,
      audioBkCon: audiobookExist.audioBkCon,
    });

    await delaudiobook.save();

    await Audiobook.deleteOne({ audioBkName });

    return res.send({ message: "book deleted successfully !", status: "del" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/get-user", async (req, res) => {
  const { username } = req.body;
  // console.log(username);
  try {
    const userInfo = await User.findOne({ username });

    if (!userInfo) {
      return res.send({ message: "User doesn't exist!", status: 400 });
    }
    return res.send({ message: "User data found", user: userInfo });
  } catch (error) {
    console.log(error);
  }
});

app.post(
  "/upload-user-pfp",
  upload.fields([{ name: "profileimage", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { username } = req.body;
      const profileimage = req.files["profileimage"]
        ? req.files["profileimage"][0]
        : null;

      const userExist = await User.findOne({ username });
      if (!userExist) {
        return res.send({ message: "User doesn't exist!" });
      }

      if (profileimage && profileimage.originalname) {
        const bufferPfp = profileimage.buffer;
        // Dynamically construct the file path
        const pfpPathPublic = path.join(
          __dirname,
          "..",
          "client",
          "public",
          "users",
          "profileImages",
          `${username}_${profileimage.originalname}`
        );

        await writeFile(pfpPathPublic, bufferPfp).catch((error) => {
          console.error("Error saving file:", error);
          throw new Error("Failed to save profile photo");
        });

        // Construct the path for accessing the image via URL
        const pfpPath = `/users/profileImages/${username}_${profileimage.originalname}`;

        // Update the user's profile image path in the database
        userExist.profileimage = pfpPath;
        await userExist.save();

        return res.send({ message: "Profile photo updated successfully" });
      } else {
        return res.status(400).send({ message: "No profile image provided" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "Internal Server Error", details: error.message });
    }
  }
);

//change user password
app.post("changing-password", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches the user's current password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Update the user's password with the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.password = hashedPassword;

    // Save the updated user object to the database
    await user.save();

    // Alert the user when password is successfully changed
    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//test book
const testbookSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    bkName: {
      type: String,
      required: true,
    },
    authName: {
      type: String,
      required: true,
    },
    bkGenre: {
      type: String,
      required: true,
    },
    bkDesp: {
      type: String,
      required: true,
    },
    bkImagePath: {
      type: String,
      required: true,
    },
    chapters: [
      {
        // id: {
        //   type: Number,
        //   required: false,
        // },
        title: {
          type: String,
          required: false,
        },
        content: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const TBook = mongoose.model("TBook", testbookSchema);

app.post(
  "/test-addbooks",
  upload.fields([{ name: "bkImage", maxCount: 1 }]),
  async (req, res) => {
    const { role, bkName, authName, bkGenre, bkDesp } = req.body;

    const bkImage = req.files["bkImage"] ? req.files["bkImage"][0] : null;

    const bookInfo = await TBook.findOne({
      bkName,
    });

    if (bookInfo) {
      return res.send({ message: "Book already there!" });
    }

    let bkImagePath = "/assets/logoExplore.png";

    if (bkImage && bkImage.originalname) {
      const bufferbkImage = bkImage.buffer;
      const bkImagePathPublic = `../client/public/users/bookCover/${
        bkName + "_" + bkImage.originalname
      }`;
      await writeFile(bkImagePathPublic, bufferbkImage);

      bkImagePath = `/users/bookCover/${bkName + "_" + bkImage.originalname}`;
    }
    const newBook = new TBook({
      role,
      bkName,
      authName,
      bkGenre,
      bkDesp,
      bkImagePath,
      // chapters: [],
    });

    await newBook.save();
    return res.send({ message: "Added Book Successfully!", status: "ok" });
  }
);
// app.post("/text-addbookchp", async (req, res) => {
app.post("/text-addbookchp", async (req, res) => {
  const { bkName, title, content } = await req.body;
  console.log(req.body);
  // console.log(bkName, title, content);
  try {
    const bookInfo = await TBook.findOne({ bkName });

    if (!bookInfo) {
      return res.send({ message: "Book not found" });
    }

    // let id;
    // if (bookInfo.chapters.length > 0) {
    //   // Find the maximum id among existing chapters and increment it
    //   id = Math.max(...bookInfo.chapters.map((chapter) => chapter.id)) + 1;
    // } else {
    //   id = 1;
    // }

    // const newChapter = { id, title, content };
    const newChapter = { title, content };
    bookInfo.chapters.push(newChapter);

    await bookInfo.save();

    return res.send({ message: "Chapter added successfully!", status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//user-delete
const delUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileimage: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    username: {
      unique: true,
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DelUser = new mongoose.model("DelUser", delUserSchema);

app.post("/deluser", async (req, res) => {
  try {
    const { _id } = req.body;
    // console.log(bkname);
    const userExist = await User.findOne({ _id: _id });

    if (!userExist) {
      return res.send({ message: "User doesn't exists!" });
    }

    const deluser = new DelUser({
      name: userExist.name,
      profileimage: userExist.profileimage,
      role: userExist.role,
      username: userExist.username,
      gender: userExist.gender,
      dob: userExist.dob,
      email: userExist.email,
      password: userExist.password,
    });

    await deluser.save();

    await User.deleteOne({ _id });

    return res.send({ message: "book deleted successfully !", status: "del" });
  } catch (error) {
    console.log(error);
  }
});

//for fetching random 3 books and display in home
app.get("/get-random-books", async (req, res) => {
  try {
    // Adjust 'Book' to match your actual Mongoose model
    const randomBooks = await TBook.aggregate([{ $sample: { size: 3 } }]);
    return res.send({ message: "Data found", data: randomBooks });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//handel premium

const paymentDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    paymentId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isPremium: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentDetail = mongoose.model("PaymentDetail", paymentDetailSchema);

app.post("/api/store-payment-details", async (req, res) => {
  console.log("Received payment details:", req.body);
  try {
    const { userId, paymentId, plan, date } = req.body;
    const pdfPath = `receipts/${paymentId}.pdf`; // Path where the PDF receipt will be saved

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    // Ensure the receipts directory exists
    const receiptsDir = path.join(__dirname, "receipts");
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir);
    }

    // Generate PDF receipt
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(24).text("Payment Receipt", 100, 80);
    doc.fontSize(16).moveDown().text(`Date: ${formattedDate}`, 100);
    doc.text(`Payment ID: ${paymentId}`, 100);
    doc.text(`Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`, 100);
    doc.text(`Amount: ${plan === "monthly" ? "₹49" : "₹499"}`, 100);
    doc.end();

    // Store payment details
    let expiryDate = new Date();
    if (req.body.plan === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (req.body.plan === "annual") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }
  
    const paymentDetail = new PaymentDetail({
      userId: req.body.userId,
      paymentId: req.body.paymentId,
      plan: req.body.plan,
      date: req.body.date,
      isPremium: true,
      expiryDate: expiryDate // Make sure your schema supports this
    });
  
    await paymentDetail.save();
    await User.findByIdAndUpdate(req.body.userId, { $set: { role2: "premium", isPremium: true } });

    
    // Return the expiry date in the response
    res.json({
      message: "Subscription successful",
      expiryDate: expiryDate.toISOString() // Send expiryDate back to the client
    });
  

    // Setup nodemailer transporter as provided
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true, // Note: `secure` should be false for port 587, true for port 465
      auth: {
        user: "it24img@gmail.com", // Your Gmail address
        pass: "fvfh msrl wuru ulkq", // Your Gmail password or App Password
      },
    });

   
    const userEmail = updatedUser.email;

    // Email content for payment receipt
    const mailOptions = {
      from: "it24img@gmail.com", // Sender address
      to: userEmail, // Recipient email from the updated user document
      subject: "Payment Receipt - Explore Premium Subscription",
      html: `<p>Hello Reader !!</p>
        <p>You are now an EXPLORE Premium user :)</p>
        <p>You can now use all our premium features.</p>
        <p>Please download your attached payment receipt.</p>`,
      attachments: [
        {
          filename: "PaymentReceipt.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res
          .status(500)
          .json({
            message: "Failed to send receipt email",
            error: err.toString(),
          });
      } else {
        console.log("Email sent: " + info.response);
        res.json({
          message:
            "Payment details stored, user updated to premium, and receipt sent successfully.",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.toString() });
  }
});

app.listen(3001, () => {
  console.log("\nBE started at port 3001");
});
