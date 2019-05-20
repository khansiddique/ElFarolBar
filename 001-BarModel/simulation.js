/******************************************************************************
 * Bar Model
 *
 * @copyright Copyright 2018-2019 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license MIT License (MIT)
*******************************************************************************/
/*******************************************************************************
 * Simulation Parameters
 ******************************************************************************/
sim.scenario.simulationEndTime = 100;
sim.scenario.idCounter = 2; // optional
// sim.scenario.idCounter = 1; // optional
// sim.scenario.randomSeed = 1234; // optional
/*******************************************************************************
 * Simulation Configuration
 ******************************************************************************/
// sim.config.stepDuration = 1;  // optional
// sim.config.runInMainThread = true; // optional
// sim.config.createLog = false;  // optional
// sim.config.visualize = false;  // optional
// sim.config.userInteractive = false;  // optional
/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.time = "discrete";
sim.model.timeUnit = "W"; // Weeks
sim.model.timeIncrement = 1; // optional

/* Object, Event, and Activity types */
sim.model.objectTypes = [ "Individual", "Bar", "Strategy" ];

sim.model.eventTypes = [];
sim.model.activityTypes = [];


/**************************************************************************
 * Global Variable and Global Function
 *
 ***************************************************************************/
/* Global Variables */
sim.model.v.numOfIndividuals = {
  range: "NonNegativeInteger",
  initialValue: 100,
  label: "Individuals",
  hint: "Number of Individuals"
};
sim.model.v.threshold = {
  range: "Decimal",
  initialValue: 0.6,
  label: "Threshold of attendance",
  hint: "Maximum number of Individuals in the Bar for an enjoyable evening"
};
sim.model.v.numOfWeeks = {
  range: "NonNegativeInteger",
  initialValue: 10,
  label: "Number of weeks",
  hint: "Memory size of each Individual"
};
sim.model.v.numOfStrategies = {
  range: "NonNegativeInteger",
  initialValue: 5,
  label: "Number of strategies",
  hint: "Number of strategies available to each Individual"
};
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
};

//Initial Events
sim.scenario.initialState.events = [];
/*******************************************************************************
 * Initialization function
 ******************************************************************************/
sim.scenario.setupInitialState = function () {
  var i, j, s, objId;
  var strategy, strategies, strategySelection;
  var attendance = [];
  var initAccuracy = [];
  for ( j = 0; j < sim.v.numOfWeeks; j += 1 ) {
    attendance.push( rand.uniformInt( 0, sim.v.numOfIndividuals ) );
  }

  for ( i = 2; i <= sim.v.numOfIndividuals + 1; i += 1 ) {
    objId = i;
    strategies = [];

    for ( s = 0; s < sim.v.numOfStrategies; s += 1 ) {
      strategy = [];
      initAccuracy[ s ] = 0;

      for ( j = 0; j < rand.uniformInt( 1, sim.v.numOfWeeks ); j += 1 ) {
        strategy.push( rand.uniform( -1, 1 ) );
      }

      strategies.push( new Strategy( {
        id: ( sim.v.numOfIndividuals + 2 ) +
          ( ( ( i - 2 ) * sim.v.numOfStrategies ) + s ),
        weights: strategy.slice()
      } ) );
    }

    strategySelection = rand.uniformInt( 0, sim.v.numOfStrategies - 1 );
    sim.addObject( new Individual( {
      id: objId,
      name: "individual" + i,
      previousDecision: false,
      decision: true,
      threshold: Math.ceil( sim.v.threshold * sim.v.numOfIndividuals ),
      weekAttendance: attendance.slice(),
      strategies: strategies.slice(),
      strategySelected: strategySelection,
      accuracies: initAccuracy.slice()
    } ) );
  }
};
/*******************************************************************************
 * Execution
 ******************************************************************************/
sim.model.OnEachTimeStep = function () {
  var bar = cLASS[ "Bar" ].instances[ "1" ];
  var individuals = cLASS[ "Individual" ].instances;
  bar.attendance = 0;

  // Calculate this week attendance to the bar
  Object.keys( individuals ).forEach( function ( objId ) {
    if ( individuals[ objId ].decide() ) {
      bar.attendance += 1;
    }
  } );

  // Keep the history of the last week.
  Object.keys( individuals ).forEach( function ( objId ) {
    individuals[ objId ].addAttendance( bar.attendance );
    individuals[ objId ].accuracyMeasurement( bar.attendance );
  } );
};
/*******************************************************************************
 * Define Output Statistics Variables
 ******************************************************************************/
sim.model.statistics = {
  "repeatedVisit": {
    range: "Decimal",
    label: "Repeated Visit",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      var total = 0;
      var individual;
      var individuals = cLASS[ "Individual" ].instances;
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
    expression: function () {
      return sim.v.threshold * sim.v.numOfIndividuals;
    }
  },
  "attendance": {
    objectType: "Bar",
    objectIdRef: 1,
    property: "attendance",
    label: "Attendance",
    showTimeSeries: true
  }
};