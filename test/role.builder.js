// 导入operation.basic
const operationBasic = require('./operation.basic');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {
		const source_index = 1;
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			// console.log(targets);
			if (targets.length) {
				operationBasic.buildConstructionSite(creep, targets[0]);
			}
			else {
				// if no construcion sites to build, fill containers and towers and spawns and extensions
				var containers_and_towers = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
					}
				});
				if (containers_and_towers.length) {
					// console.log(containers_and_towers[0]);
					operationBasic.transferEnergyToContainerOrStorage(creep, containers_and_towers[0]);
				}
				else {
					// if no containers to fill, upgrade controller
					operationBasic.upgradeController(creep, creep.room.controller);
				}
			}
		}
		else {
			// harvest from container if container is not empty
			var containers = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
				}
			});
		}
	}
};

module.exports = roleBuilder;