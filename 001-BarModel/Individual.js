/*******************************************************************************
 * Individual Object
 * 
 * @copyright Copyright 2018 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license The MIT License (MIT)
 ******************************************************************************/
/**
 * description
 * @namespace
 * @property {Boolean} decision - ...
 */
var Individual = new cLASS({
  Name: "Individual",
  shortLabel: "individual",
  supertypeName: "oBJECT",
  properties: {
    /*
     "strategies": {
       range: "Strategy",
       label: "Set of Strategies",
       shortLabel: "K",
       minCard:0,
       maxCard:Infinity
       },
     "weekAttendance": {
       range: "NonNegativeInteger",
       label: "Per week Data",
       shortLabel: "d",
       minCard:0,
       maxCard:Infinity
     },
     */
    //Decision for True = to go Bar, & False = Stay Home.
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
    /**
 * @namespace
 * 
 * @property {object}  Strategy type class.
 * @property {weight}  value range -1 to 1 - Randomly choose for one strategy only.
 */
    "strategies": {
      range: "Strategy",
      label: "Set of Strategies",
      shortLabel: "K",
      minCard: 0,
      maxCard: Infinity
    },
    /**
    * @namespace
    * 
    * @property { object } Strategy type class.
    * @property { weight } value range - 1 to 1 - Randomly choose for one strategy only.
   */
    "strategySelecteded": {
      range: "NonNegativeInteger",
      label: "Selected of Strategy",
      shortLabel: "sS"
      //minCard: 0,
      //maxCard: Infinity
    },

    /**
    * @des
    * 
    * @property {array} accuracies- keep value range the accuracy of the decision.
    */
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
     * decide
     * 
     * @param {} ...
     * @return ...
     */
    "decide": function () {
      //console.log(this.strategies);
      var count;
      var totalAttendance = 0;
      var numofweekweight = [];
      
      //console.log(this.strategies.length + ', ' + lowerValue + ', ' + upperValue);
      
      /** Select random strategy for the individual and get the weight for calculate
       * and guess total attendance
       * or
       * Select a strategy from getting a data from accuracy vector sets.
      */
      //this.strategySeleteded = ;
      
      //console.log("ACCURACY:" + this.accuracies[this.strategySelecteded]);
      
      //if (this.accuracies[this.strategySelecteded] == 0) {
      this.selectStrategy();
      //console.log("SELECTION:" + this.strategySelecteded);
      //  this.accuracyMeasurement();
      numofweekweight = this.strategies[this.strategySelecteded].weights;
      //console.log(numofweekweight);
      //console.log(numofweekweight.weights.length);
      //console.log(numofweekweight.weights[0]);
      
      // create a for loop to get a final attendance based on strategise and weekAttendance.
      for (count = 0; count < numofweekweight.length; count += 1) {
        //console.log("Weight: " + numofweekweight[count] + ", " + "Attendance: " + this.weekAttendance[count]);
        totalAttendance += numofweekweight[count] * this.weekAttendance[count];
        
      }
      
      //}
      //console.log("Total Attendence:"+ totalAttendance);
      if (totalAttendance <= sim.v.threshold) {
        this.decision = true;
        return true;
      } else {
        this.decision = false;
        return false;
      }
      
    },
    /**
     * Add a new history for each indivivuals for each week
     * 
     * @param {string} attendance - Current week attendance
     */
    "addAttendance": function (attendance) {
      this.weekAttendance.push(attendance);
      this.weekAttendance = this.weekAttendance.slice(-sim.v.numofweek);
    },

    /**
    * Create an algorithm to pick an accurate a strategy selection
    * for decision making to go to the bar or not go to the Bar.
    * @param {-} XXXXX - No argument/parameter pass in the function. 
    */
    "selectStrategy": function () {
      var maxAccuracyCount = -Infinity;
      var selectIndexofStrategy = [];
      var tempAccuracies = this.accuracies;
      var i; //, s = 0;
      /**
        * loop iteratet with for selection of a random value or previous strategy.
        * 
        */
      for (i = 0; i < sim.v.numofstrategy; i += 1) {
        //strategy = [];
        //initAccuracy[s] = 0;
        if (maxAccuracyCount < tempAccuracies[i]) {
        //  s = 0; // initialize the array index of the selected index of the strategy
          selectIndexofStrategy = [];
          maxAccuracyCount = tempAccuracies[i];
        } else if (maxAccuracyCount > tempAccuracies[i]) {
          continue; // to skip the lower value than the Max accuracy value
        }
        selectIndexofStrategy.push(i); //[s] = i;
        //s += 1;
      }
      //console.log("select Index of Strategy:" + selectIndexofStrategy + "Accuracy Vector:" + this.accuracies);
      this.strategySelecteded = selectIndexofStrategy[rand.uniformInt(0, selectIndexofStrategy.length - 1)];
        /*
        for (j = 0; j < rand.uniformInt(0, selectIndexofStrategy.length - 1); j += 1) {
          strategy.push(rand.uniform(-1, 1));
        }
        */
        
    },

    /**
     * Increment or decrement the level of the accuracy
     * 
     * @param {integer} attendance - check the strategy was accurate or not
     * if Bar attendence is more than Threshold and Individual make a decision, 
     * to go Bar then he became unhappy and want to change his strategy for 
     * the next period of time.
     */
    "accuracyMeasurement": function (attendance) {
      /*
      var bar = cLASS["Bar"].instances["1"];
      var newStrategy;
      
      //Here we try to give an award or Increase the value of selected strategy.
      this.accuracies[this.strategySelecteded] += 1;
      //Here we try to give an degrade or decrease the value of selected strategy.
      this.accuracies[this.strategySelecteded] -= 1; 
      */

      if (((attendance > sim.v.threshold) && (this.decision === true)) ||
        ((attendance < sim.v.threshold) && (this.decision === false))) {
        this.accuracies[this.strategySelecteded] -= 1;
      } else {
        this.accuracies[this.strategySelecteded] += 1;
      }

      /*
        while (true) {
          newStrategy = rand.uniformInt(0, sim.v.numofstrategy - 1);
          if (newStrategy === this.strategySelecteded) {
            continue;
          }
          else {
            this.strategySelecteded = newStrategy;
            break;
          }
        }
      
        console.log("Accuracy Array: " + this.accuracies);
      } */ 
    }
  }
});
