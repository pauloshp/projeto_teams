import express from "express"

const app = express()

app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get('/', function (req, res, next) {
  res.render('index')
});

app.post('/upload', (req, res, next) => {

  const formidable = require('formidable')
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    
    /////////////////////////////////

    const csv = require('csvtojson')

    csv().fromFile(files.csvFile.path)
    .then(records => {

        console.log(records);

        const fs = require('fs');

        fs.readFile(files.csvFile.path, 'utf8', function (err, data) {
          fs.writeFile("/home/henrique/Documentos/tempfilep/records.json", data , function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
              res.json(data)
          }); 

          fs.writeFileSync("/home/henrique/Documentos/tempfilep/records.json", data);
        });

    }).catch(err => {

        console.log(err);
    });

    /////////////////////////////////

    const path = require('path')
    const oldpath = files.csvFile.path
    const newpath = path.join(__dirname, '..', 'file', files.csvFile.name)
    
    // const fs = require('fs')
    
    // fs.renameSync(oldpath, newpath)
    // console.log('file uploaded and moved!')
    // res.send('File uploaded and moved!')

    // Se fs não funcionar
    const mv = require('mv')

    mv(oldpath, newpath, (err) => {
      if (err) { 
        throw err; 
      }

      console.log('file uploaded and moved!')
      // res.send('File uploaded and moved!')
      // res.json({ fields, files });

    });

  });

});

app.listen(7000, () => console.log("Server running"))
