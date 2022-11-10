const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const findRemoveSync = require("find-remove");
const fs = require("fs");
const mergerPdf = require("./mergerPdf");
app.use("/", express.static("public"));
const deleteUploads = findRemoveSync("uploads", {
  dir: "*",
  files: "*.*",
  age: { seconds: 360 },
});
const deletemergedPdf = findRemoveSync("public/mergedPdf", {
  dir: "*",
  files: "*.*",
  age: { seconds: 360 },
});
console.log(deleteUploads);
console.log(deletemergedPdf);
app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  const mergedFile = await mergerPdf(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(
    `https://pdfmergerr.azurewebsites.net/mergedPdf/${mergedFile}.pdf`
  );
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//  auto delte file
