/*******************************************************************************
 * EL Farol Bar Model
 * 
 * @copyright Copyright 2018 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license The MIT License (MIT)
 ******************************************************************************/
var sim = sim || {};
sim.model = sim.model || {};
sim.scenario = sim.scenario || {};
sim.config = sim.config || {};

var oes = oes || {};
oes.ui = oes.ui || {};
oes.ui.explanation = {};

/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.name = "EL Farol Bar";
sim.model.title = "El Farol Bar";
// sim.model.systemNarrative =
//     "<p>An Entrepreneur is selling one product type only, such that its "
//         + "in-house inventory only consists of items of that type. On each "
//         + "business day, customers come to the shop and place their orders. If "
//         + "the ordered product quantity is in stock, the customer pays for the "
//         + "order and the ordered products are provided. Otherwise, the "
//         + "Entrepreneur has missed a business opportunity and the difference "
//         + "between order quantity and the inventory level counts as a lost "
//         + "sale. The order may still be partially fulfilled, if there are "
//         + "still some items in stock, else the customer receives no item.</p>";
// sim.model.shortDescription =
//     "<p>The model defines an simple purchase transaction for a single "
//         + "product enterprise. For simplicity, customer orders are treated "
//         + "in an abstract way by aggregating all of them into a single "
//         + "demand, such that the random variation of the daily order "
//         + "quantity is modeled by a random variable.</p>"
sim.model.license = "CC BY-NC";
sim.model.creator = "Siddique Reza Khan";
sim.model.created = "2018-11-20";
sim.model.modified = "2018-11-20";
