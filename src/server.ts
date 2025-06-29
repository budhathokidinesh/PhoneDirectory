import express from "express";
const app = express();
const port = 8000;
//connnect MongoDb
connectDB();

app.use(express.json());
app.use("/api/phone-directory", phoneDirectoryRoutes);

app.get("/", (req, res) => {
  res.send("welcome to the phone directory");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
