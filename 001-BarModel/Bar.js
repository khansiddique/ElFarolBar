/******************************************************************************
 * Bar Object
 * 
 * @copyright Copyright 2018 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license The MIT License (MIT)
*******************************************************************************/
var Bar = new cLASS({
  Name: "Bar",
  shortLabel: "bar",
  supertypeName: "oBJECT",
  properties: {
  /*
    "peopleAttendMin": {
      range: "NonNegativeInteger",
      label: "Min Pepple Attendance in Bar"
    },
   */

    "attendance": {
      range: "NonNegativeInteger",
      label: "Person attendance in Bar"
    }
  },
  
  // For generating the "Initial History of d={a set of week data}" I need at most 10 weeks random data  
  // This method may not need here based any-other logic
   
  methods: {
  }
});
