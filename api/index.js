const express = require("express");
const app = express();
const db = require("./config/db-connect");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const cookieParser = require("cookie-parser");
var cors = require("cors")
const corsOptions = {
  origin: "http://localhost:3000", // Frontend address
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Necessary for cookie-based sessions
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
