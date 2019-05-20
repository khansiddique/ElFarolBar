/*******************************************************************************
 * Individual object class - Individual who decides to attend the bar or stays
 * home based on the experience of the previous weeks.
 *
 * @copyright Copyright 2018-2019 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license MIT License (MIT)
 ******************************************************************************/
var Individual = new cLASS( {
  Name: "Individual",
  shortLabel: "individual",
  supertypeName: "oBJECT",
  properties: {
    "previousDecision": {
      range: "Boolean",
      label: "Last decision to attend the bar",
      shortLabel: "pD"
    },
    "decision": {
      range: "Boolean",
      label: "Current decision to attend the bar",
      shortLabel: "D"
    },
    "threshold": {
      range: "NonNegativeInteger",
      label: "Preference threshold",
      shortLabel: "H0"
    },
    "weekAttendance": {
      range: "NonNegativeInteger",
      label: "Attendance memory",
      shortLabel: "d",
      minCard: 0,
      maxCard: Infinity
    },
    "strategies": {
      range: "Strategy",
      label: "Set of Strategies",
      shortLabel: "K",
      minCard: 0,
      maxCard: Infinity
    },
    "strategySelected": {
      range: "NonNegativeInteger",
      label: "Current Strategy",
      shortLabel: "sS"
    },
    "accuracies": {
      range: "NonNegativeInteger",
      label: "Efficacy of the strategies",
      shortLabel: "A",
      minCard: 0,
      maxCard: Infinity
    }
  },
  methods: {
    /**
     * Decides whether or not to attend the bar this week
     *
     * @return True if decide to attend, False otherwise
     */
    "decide": function () {
      var attendanceEstimation = 0;

      // Choose one strategy
      this.selectStrategy();

      // Estimate the attendance based on the chosen strategy and prior
      // experience
      this.strategies[ this.strategySelected ].weights.forEach(
        ( weight, index ) => {
          attendanceEstimation += weight * this.weekAttendance[ index ];
        } );

      if ( attendanceEstimation <= this.threshold ) {
        this.decision = true;
      } else {
        this.decision = false;
      }
      return this.decision;
    },
    /**
     * Add attendance into Individual's memory
     *
     * @param {integer} attendance - Current week attendance
     */
    "addAttendance": function ( attendance ) {
      this.weekAttendance.push( attendance );
      this.weekAttendance = this.weekAttendance.slice( -sim.v.numOfWeeks );
    },
    /**
    * Select the most accurate strategy to decide whether or not to attend the
    * bar.
    */
    "selectStrategy": function () {
      var i;
      var maxAccuracyCount = -Infinity;
      var selectIndexOfStrategy = [];
      var tempAccuracies = this.accuracies;

      for ( i = 0; i < sim.v.numOfStrategies; i += 1 ) {
        if ( maxAccuracyCount < tempAccuracies[ i ] ) {
          selectIndexOfStrategy = [];
          maxAccuracyCount = tempAccuracies[ i ];
        } else if ( maxAccuracyCount > tempAccuracies[ i ] ) {
          continue;
        }
        selectIndexOfStrategy.push( i );
      }

      this.strategySelected = selectIndexOfStrategy[ rand.uniformInt( 0,
        selectIndexOfStrategy.length - 1 ) ];
    },
    /**
     * Update the strategy accuracy.
     *
     * @param {integer} attendance - Actual week attendance
     */
    "accuracyMeasurement": function ( attendance ) {
      if ( ( ( attendance > this.threshold ) && ( this.decision === true ) ) ||
        ( ( attendance < this.threshold ) && ( this.decision === false ) ) ) {
        this.accuracies[ this.strategySelected ] -= 1;
      } else {
        this.accuracies[ this.strategySelected ] += 1;
      }
    }
  }
} );