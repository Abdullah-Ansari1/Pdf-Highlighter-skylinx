//const express = require("express");
const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  content: {
    text:{ type: String},
  },
  position: {
    boundingRect: {
      x1: { type: Number, required: true },
      y1: { type: Number, required: true },
      x2: { type: Number, required: true },
      y2: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      pageNumber: { type: Number, required: true },
    },
  rects:[
    {
        x1: { type: Number, required: true },
        y1: { type: Number, required: true },
        x2: { type: Number, required: true },
        y2: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        pageNumber: { type: Number, required: true },
      }
    ],
    pageNumber:{type:Number, required: true}
},
comment: {
    text:{ type: String},
    emoji:{type:String}
  },
  id: {
    type: String,
    required: true,
  }
});

//We are creating a new collection
const PdfTesting = new mongoose.model("PdfTesting", pdfSchema);
module.exports = PdfTesting;
