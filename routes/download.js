var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var brownBag = require('../models/brownBag.js');

router.get('/',function(req, res){
  const excel = require('node-excel-export');
  const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};
 
//Array of objects representing heading rows (very top) 
const heading = [
  [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
  ['a2', 'b2', 'c2'] // <-- It can be only values 
];
 
//Here you specify the export structure 
const specification = {
  name: { // <- the key should match the actual data key 
    displayName: 'Name', // <- Here you specify the column header 
    headerStyle: styles.headerDark, // <- Header style 
    width: 120 // <- width in pixels 
  },
  preferred: {
    displayName: 'Meal Preference',
    headerStyle: styles.headerDark,
    width: '10' // <- width in chars (when the number is passed as string) 
  },
  option: {
    displayName: 'Menu Option',
    headerStyle: styles.headerDark,
    cellStyle: styles.cellPink, // <- Cell style 
    width: 220 // <- width in pixels 
  }
}
 
// The data set should have the following shape (Array of Objects) 
// The order of the keys is irrelevant, it is also irrelevant if the 
// dataset contains more fields as the report is build based on the 
// specification provided above. But you should have all the fields 
// that are listed in the report specification 
var dataset = [];
var voteData = brownBag.find(function(err, result){
  result.forEach(function(record){
    data = {};
    data = {
      name : record.name,
      preferred: record.preferred,
      option: record.option
    }
    dataset.push(data);
  })
// Define an array of merges. 1-1 = A:1 
// The merges are independent of the data. 
// A merge will overwrite all data _not_ in the top-left cell. 
const merges = [
  { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
  { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
  { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
]
// Create the excel report. 
// This function will return Buffer 
const report = excel.buildExport(
  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
    {
      name: 'Report', // <- Specify sheet name (optional) 
      heading: heading, // <- Raw heading array (optional) 
      merges: merges, // <- Merge cell ranges 
      specification: specification, // <- Report specification 
      data: dataset // <-- Report data 
    }
  ]
);
 
// You can then return this straight 
res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
return res.send(report);
})
// const dataset = [
//   {name: 'IBM', preferred: 1, option: 'some option', misc: 'not shown'},
//   {name: 'HP', preferred: 0, option: 'some option'},
//   {name: 'MS', preferred: 0, option: 'some option', misc: 'not shown'}
// ]
 

})

module.exports = router;