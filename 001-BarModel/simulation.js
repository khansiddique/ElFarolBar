/******************************************************************************
 * Bar Model
 *
 * @copyright Copyright 2018 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license The MIT License (MIT)
 * First Task to Take input from the user for Number of Individual Attendance in Bar
 * N= 100 // initially Value Setup in the Model Variable. ---- Done;
 * Second Task
 * Define Two Class for
 * 1. Individual.js
 * 2. Bar.js
 *
 * Third Task
 * Define the Properties for as well as method for the
 * Individual Class
 * Define Properties:
 * Define Methods:
 * Forth Task
 * Define the Properties for as well as method for the
 * Bar Class
 * Define Properties:
 * Define Methods:
*******************************************************************************/
/*******************************************************************************
 * Simulation Parameters
 ******************************************************************************/
sim.scenario.simulationEndTime = 100;
sim.scenario.idCounter = 2; // optional
//sim.scenario.idCounter = 1; // optional
sim.scenario.randomSeed = 1234; // optional
/*******************************************************************************
 * Simulation Configuration
 ******************************************************************************/
//sim.config.stepDuration = 1;  // optional
//sim.config.createLog = false;  // optional
//sim.config.visualize = false;  // optional
//sim.config.userInteractive = false;  // optional
/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.time = "discrete";
sim.model.timeUnit = "W"; // Weeks
sim.model.timeIncrement = 1; // optional

/* Object, Event, and Activity types */
sim.model.objectTypes = ["Individual", "Bar", "Strategy" ];

sim.model.eventTypes = [];
sim.model.activityTypes = [];


/**************************************************************************
 * Global Variable and Global Function
 *
 ***************************************************************************/
/* Global Variables */

sim.model.v.individuals = {
  range: "NonNegativeInteger",
  initialValue: 100,
  label: "Individuals",
  hint: "Number of individuals"
};

sim.model.v.threshold = {
  range: "NonNegativeInteger",
  initialValue: 60,
  label: "Threshold of attendance",
  hint: "Maximum number of Individual in the Bar for an enjoyable evening"
};

sim.model.v.numofweek = {
  range: "NonNegativeInteger",
  initialValue: 10,
  label: "Number of weeks",
  hint: "Memory Space"
};

sim.model.v.numofstrategy = {
  range: "NonNegativeInteger",
  initialValue: 5,
  label: "Number of strategies",
  hint: "One individual has several strategies"
};

/*
sim.model.v.strategies = {
  range: "NonNegativeInteger",
  initialValue: 5,
  label: "Strategies",
  hint: "Strategies for prediction"
};
*/
/* Global Functions */

/*******************************************************************************
 * Define Initial State
 ******************************************************************************/
// Initial Objects
sim.scenario.initialState.objects = {
  "1": {
    typeName: "Bar",
    name: "bar",
    attendance: 0
  }
  /*
  "1000": {
    typeName: "Strategy",
    name: "strategy",
    weights: []
  }
  */
  // At the first day of Bar opening
  ///................................... sim.v.peopleAttends
  // },
  // "2": {
  //   typeName: "Individual",
  //   name: "individual",
  //   decision: true,
  //   threshold: 60 // At the first day of Bar opening
  //   ///................................... sim.v.peopleAttends
  // }

};


//Initial Events
sim.scenario.initialState.events = [];

//Initial Functions
// sim.scenario.setupInitialState = function () {}

//Initial Functions

// I want to set up all objects for the Indivivual Class property such as
// Properties: strategies(Strategy class), decision(Boolean), weekAttendance(NonNegativeInteger),
//threshold(NonNegativeInteger), etc......
//

sim.scenario.setupInitialState = function () {
  var i;
  var objId;
  var attendance = [];
  var initAccuracy=[];
  var strategy,strategies,strategySelection;
  var j,s;
  for(j=0;j<sim.v.numofweek;j+=1){
    attendance.push(rand.uniformInt(0,sim.v.individuals));
  }

  //console.log(sim.v.individuals);
  for ( i = 2; i <= sim.v.individuals + 1; i += 1) {
    objId = i;
    strategies = [];
    /**
    * Here Description .
    * @prop {object} weights - A random value required from -1 to 1
    * @prop {object} strategies - [weight = [],weight = []....number of strategies]
    *                             An array of weights for taking one strategy
    */
    for (s = 0; s < sim.v.numofstrategy; s += 1) {
      strategy = [];
      initAccuracy[s] = 0;
      /**
      * loop iteratet with random value.
      * @param {object} weight - randomly selected.
      */
      for (j = 0; j < rand.uniformInt(1,sim.v.numofweek); j += 1) {
        strategy.push(rand.uniform(-1, 1));
      }

      strategies.push(new Strategy({
        id: (sim.v.individuals + 2) + (((i - 2) * sim.v.numofstrategy) + s),
        weights: strategy.slice()
      }));
    }

    strategySelection = rand.uniformInt(0, sim.v.numofstrategy - 1);
    sim.addObject(new Individual({
      id:objId,
      name: "individual" + i,
      previousDecision: false,
      decision: true,
      threshold:sim.v.threshold,
      weekAttendance: attendance.slice(),
      //strategies.weights:
      strategies: strategies.slice(),
      strategySelecteded: strategySelection,
      accuracies: initAccuracy.slice()
    }));
  }
  // console.log( "STRATEGY " + Object.keys( cLASS["Strategy"].instances ) );
};

/*******************************************************************************
 * Execution
 ******************************************************************************/


sim.model.OnEachTimeStep = function () {
  var bar = cLASS["Bar"].instances["1"];
  var individuals=cLASS["Individual"].instances;

  //console.log("OBJECTS " + Object.keys(sim.namedObjects));
  //console.log("INDIVIDUALS " + Object.keys(cLASS["Individual"].instances));

  bar.attendance=0;

  Object.keys(individuals).forEach(function (objId) {
    //console.log(individuals[objId]);
    if(individuals[objId].decide()){
      bar.attendance+=1;  // Increase attendance if decide to attend the bar.
    }
  });
  //console.log(sim.v.storeweekaddendance);
  //console.log(bar.attendance);

  //Keep the history of the last week.
  Object.keys(individuals).forEach(function(objId){
    individuals[objId].addAttendance(bar.attendance);
    individuals[objId].accuracyMeasurement(bar.attendance);
    //console.log(individuals[objId].weekAttendance);
  });
  //console.log(individuals);
};


/*******************************************************************************
 * Define Output Statistics Variables
 ******************************************************************************/
sim.model.statistics = {
  /*
  "lostSales": {
    range:"NonNegativeInteger",
    label:"Lost Sales"
  },
  "minInventory": {
    objectType:"Entrepreneur",
    objectIdRef: 1,
    property: "inventoryLevel",
    aggregationFunction: "min",
    label: "Min. inventory"
  },
  */

  "repeatedVisit": {
    range: "Decimal",
    label: "Repeated Visit",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      var total = 0;
      var individual;
      var individuals = cLASS["Individual"].instances;
      Object.keys( individuals ).forEach( function ( objId ) {
        individual = individuals[ objId ];
        if ( individual.previousDecision && individual.decision ) {
          total += 1;
        }
        individual.previousDecision = individual.decision;
      } );

      return ( total / Object.keys( individuals ).length ) * 100;
    }
  },

  "repeatedNoVisit": {
    range: "Decimal",
    label: "Repeated No Visit",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      var total = 0;
      var individual;
      var individuals = cLASS[ "Individual" ].instances;
      Object.keys( individuals ).forEach( function ( objId ) {
        individual = individuals[ objId ];
        if ( !individual.previousDecision && !individual.decision ) {
          total += 1;
        }
        individual.previousDecision = individual.decision;
      } );

      return ( total / Object.keys( individuals ).length ) * 100;
    }
  },

  "threshold": {
    range: "NonNegativeInteger",
    label: "Threshold",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function() {
      return sim.v.threshold;
    }
  },

  "attendance": {
    objectType:"Bar",
    objectIdRef: 1,
    property: "attendance",
    label: "Attendance",
    showTimeSeries: true
  }

  // Why need this statistic......???
  /*
  "inventory": {
    objectType:"Entrepreneur",
    objectIdRef: 1,
    property: "inventoryLevel",
    aggregationFunction: "max",
    label: "Inventory Level",
    showTimeSeries: true
  }
  */
};
