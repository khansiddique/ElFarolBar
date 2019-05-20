/*******************************************************************************
 * EL Farol Bar Model
 *
 * @copyright Copyright 2018-2019 Brandenburg University of Technology
 * @author Siddique Reza Khan
 * @license MIT License (MIT)
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
sim.model.name = "ELFarolBar-1";
sim.model.title = "El Farol Bar Model";
sim.model.systemNarrative = "<p>The El Farol bar is a problem in game theory proposed by W. Brian Arthur in 1994. The problem consists in a finite population of people that wants to attend the El Farol bar every Thursday night. However, the bar is quite small and people have a preference to attend the bar only when its not overcrowded. Thus, every week people need to decide whether to attend the bar based solely on their prior knowledge. They are not allowed to communicate among themselves and they decide simultaneously to attend or not the bar. If the bar is not overcrowded, people attending the bar will have a better time than if they had stayed home. If the bar is overcrowded, people attending the bar will have a worse time than if they had stayed home. This experience informs future decisions to attend the bar.</p>";
sim.model.shortDescription = "<p>The El Farol Bar model has two types of objects: Bar and Individual. The model is composed of a single Bar and multiple Individuals (configurable). The model defines that all Individuals have the same preference threshold (configurable). Each Individual has a different set of strategies to decide to attend the bar using their prior knowledge and Individuals keep track of the efficacy of each strategy.</p><p>At each time step (or week), each Individual chooses the strategy with the highest efficacy among all strategies. If more than one strategy have the same efficacy, the Individual decides randomly among those strategies. Next, each Individual estimate the attendance to the bar using the selected strategy together with the prior knowledge about the bar attendance. If the estimation is less than the preference threshold, the Individual decides to attend the base, or stay at home otherwise. After all Individuals make their decision, the actual attendance is calculated. If the actual bar attendance is greater than the preference threshold and the Individual decided to attend the bar, its strategy efficacy is decreased, otherwise it is increased. But, if the actual bar attendance is less than the preference threshold and the Individual decided to attend the bar, its strategy efficacy is increase, otherwise it is decreased. Finally, all Individuals memorize the actual bar attendance to use in future decisions.</p>";
sim.model.source = "Arthur, W. B. (1994). " +
  "<a href='https://www.jstor.org/stable/2117868' target='_blank'>Inductive " +
  "reasoning and bounded rationality</a >, <i>American Economic Review</i>, " +
  "84(2), pp. 406-411.";
sim.model.license = "MIT";
sim.model.creator = "Siddique Reza Khan";
sim.model.contributors = "Luis Gustavo Nardin";
sim.model.created = "2018-11-20";
sim.model.modified = "2019-05-20";