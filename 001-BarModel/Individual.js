/*******************************************************************************
 * Individual Class - Individual is trying to decide if he/she will attend into
 * the bar for pleasure or stay in the home on the basis of some previous
 * available weeekly datas and some sort of strategies to take accurate
 * decision.
 *
 * @copyright Copyright 2018-2019 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license MIT License (MIT)
 ******************************************************************************/
var Individual = new cLASS({
  Name: "Individual",
  shortLabel: "individual",
  supertypeName: "oBJECT",
  properties: {
    "previousDecision": {
      range: "Boolean",
      label: "Person's previous decision about go to the bar",
      shortLabel: "pD"
    },
    "decision": {
      range: "Boolean",
      label: "Person's decision about go to the bar",
      shortLabel: "D"
    },
    "threshold": {
      range: "NonNegativeInteger",
      label: "People satisfaction",
      shortLabel: "H0"
    },
    "weekAttendance": {
      range: "NonNegativeInteger",
      label: "Per week Data",
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
    "strategySelecteded": {
      range: "NonNegativeInteger",
      label: "Selected of Strategy",
      shortLabel: "sS"
    },
    "accuracies": {
      range: "NonNegativeInteger",
      label: "Strategies accuracy",
      shortLabel: "A",
      minCard: 0,
      maxCard: Infinity
    }
  },
  methods: {
    /**
     * Select random strategy for the individual and get the weight
     * for calculate and guess total attendance or Select a strategy from
     * getting a data from accuracy vector sets.
     *
     * @return True if predicted attendance lower than threshold,
     * otherwise False
     */
    "decide": function () {

      var count;
      var totalAttendance = 0;
      var numOfWeekWeights = [];
      this.selectStrategy();
      numOfWeekWeights = this.strategies[this.strategySelecteded].weights;

      // Get a final attendance based on strategies and weekAttendance.
      for (count = 0; count < numOfWeekWeights.length; count += 1) {
        totalAttendance += numOfWeekWeights[count] * this.weekAttendance[count];

      }
      if (totalAttendance <= sim.v.threshold) {
        this.decision = true;
      } else {
        this.decision = false;
      }
      return this.decision;
    },
    /**
     * Add a new history for each individuals for each week
     *
     * @param {integer} attendance - Current week attendance
     */
    "addAttendance": function (attendance) {
      this.weekAttendance.push(attendance);
      this.weekAttendance = this.weekAttendance.slice(-sim.v.numOfWeeks);
    },

    /**
    * Create an algorithm to pick an accurate strategy selection
    * for decision making to go to the bar or not go to the Bar.
    */
    "selectStrategy": function () {
      var maxAccuracyCount = -Infinity;
      var selectIndexOfStrategy = [];
      var tempAccuracies = this.accuracies;
      var i;

      for (i = 0; i < sim.v.numOfStrategies; i += 1) {
        if (maxAccuracyCount < tempAccuracies[i]) {
          selectIndexOfStrategy = [];
          maxAccuracyCount = tempAccuracies[i];
        } else if (maxAccuracyCount > tempAccuracies[i]) {
          continue;
        }
        selectIndexOfStrategy.push(i);
      }
      this.strategySelecteded =
        selectIndexOfStrategy[rand.uniformInt(0,
          selectIndexOfStrategy.length - 1)];
    },

    /**
     * Increment or decrement the level of the accuracy. Here we
     * try to give an award or Increase the value of selected strategy. Again
     * we try to give an degrade or decrease the value of selected strategy.
     * check the strategy was accurate or not if Bar attendance is more than
     * threshold and Individual make a decision, to go Bar then he became
     * unhappy and want to change his strategy for the next period of time.
     *
     * @param {integer} attendance - Current week attendance
     *
     */
    "accuracyMeasurement": function (attendance) {
      if (((attendance > sim.v.threshold) && (this.decision === true)) ||
        ((attendance < sim.v.threshold) && (this.decision === false))) {
        this.accuracies[this.strategySelecteded] -= 1;
      } else {
        this.accuracies[this.strategySelecteded] += 1;
      }
    }
  }
});
