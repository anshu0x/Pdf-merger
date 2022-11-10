const express = require("express");
const app = express();
const port = process.env.PORT ||  3000;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const mergerPdf = require("./mergerPdf");
app.use("/", express.static("public"));
app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  const mergedFile = await mergerPdf(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`https://pdfmergerr.azurewebsites.net/mergedPdf/${mergedFile}.pdf`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
