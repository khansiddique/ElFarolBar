/*******************************************************************************
 * Strategy object class
 *
 * @copyright Copyright 2018-2019 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license MIT License (MIT)
 ******************************************************************************/
var Strategy = new cLASS({
  Name: "Strategy",
  shortLabel: "strategy",
  supertypeName: "oBJECT",
  properties: {
    "weights": {
      range: "Decimal",
      label: "Week Weights",
      shortLabel: "w",
      minCard: 0,
      maxCard: Infinity
    }
  },
  methods: {
  }
});