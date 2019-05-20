/******************************************************************************
 * Bar object class
 *
 * @copyright Copyright 2018-2019 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license MIT License (MIT)
*******************************************************************************/
var Bar = new cLASS( {
  Name: "Bar",
  shortLabel: "bar",
  supertypeName: "oBJECT",
  properties: {
    "attendance": {
      range: "NonNegativeInteger",
      label: "Person attendance in Bar"
    }
  },
  methods: {
  }
} );