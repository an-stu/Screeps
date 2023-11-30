const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleCreate = require('./role.create');
const roleBuilder = require('./role.builder');
const roleRepairer = require('./role.repairer');
const roleScout = require('./role.scout');
const roleCarrier = require('./role.carrier');


module.exports.loop = function () {
	roleCreate.create();
	// 运行
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
		if (creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		}
		if (creep.memory.role == 'repairer') {
			roleRepairer.run(creep);
		}
		if (creep.memory.role == 'scout') {
			roleScout.run(creep);
		}
		if (creep.memory.role == 'carrier') {
			roleCarrier.run(creep);
		}
	}
}