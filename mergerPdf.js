const PDFMerger = require("pdf-merger-js");
const path = require("path");
var merger = new PDFMerger();

const mergerPdf = async (p1, p2) => {
  await merger.add(p1);
  await merger.add(p2);
  let randomKey = new Date().getTime();
  await merger.save(path.join(__dirname, `public/mergedPdf/${randomKey}.pdf`));
  return randomKey;
};

module.exports = mergerPdf;
