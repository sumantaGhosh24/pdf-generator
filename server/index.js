const express = require("express");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./documents");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post("/create-pdf", (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${req.body.receiptId}.pdf`, (error) => {
      if (error) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
});

app.get("/fetch-pdf/:id", (req, res) => {
  res.sendFile(`${__dirname}/${req.params.id}.pdf`);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
