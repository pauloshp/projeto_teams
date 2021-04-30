import express from "express";

const app = express()

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get('/', function (req, res, next) {
  res.render('index')
});

app.post('/upload', (req, res, next) => {
  const formidable = require('formidable');
  const fs = require('fs');
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    const path = require('path')
    const oldpath = files.csvFile.path;
    const newpath = path.join(__dirname, '..', 'file', files.csvFile.name);
    
    fs.renameSync(oldpath, newpath);
    res.send('File uploaded and moved!');

  });

});

app.listen(7000, () => console.log("Server running"))
