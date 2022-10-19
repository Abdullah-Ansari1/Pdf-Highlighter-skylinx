const express = require("express");
const router = new express.Router();
const PdfTesting=  require("../models/pdfdata");

router.route("/").get(async(req,res)=>{
  console.log("PDF GET")
  try {
    const getData = await PdfTesting.find();
    res.status(200).send(getData);
      
  } catch (e) {
      res.status(400).send(e);
  }
}).post(async(req,res)=>{
  console.log("PDF POST")
  console.log(req.body);
  try {
       const Pdfrecord = new PdfTesting(req.body);
       const insertpdf = await Pdfrecord.save();
       res.status(201).send(insertpdf);
         
     } catch (e) {
         res.status(400).send(e.message);
     }
 })
 module.exports = router;