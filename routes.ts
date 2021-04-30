import { Router, Request, Response } from 'express'
import { FileArray } from "express-fileupload";

const routes = Router()

routes.post('/app', (req, res ) => {
  console.log(req.files);

  // if (!req.files) {

  //   res.status(400).json({ error: 'No files were uploaded.' })

  // } else {

  //   const Fileuploaded = req.files.csvFile
  //   res.send('File uploaded!');

  // }

})

export { routes }