/**
 * Creates a new Strategy.
 * @class
 */
var Strategy = new cLASS({
    Name: "Strategy",
    shortLabel: "strategy",
    supertypeName: "oBJECT",
    properties: {
      "weights": {
        range: "Decimal",
        label: "Week Weights",
        shortLabel: "w",
        minCard:0,
        maxCard:Infinity
        }
    },
      methods: {
  }
  } );