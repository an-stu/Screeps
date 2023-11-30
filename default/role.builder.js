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
			if (targets.length) {
				operationBasic.buildConstructionSite(creep, targets[0]);
			}
			else {
				// if no construction site, fill tower
				var towers = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_TOWER) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				});
				if (towers.length > 0) {
					operationBasic.transferEnergyToContainerOrStorage(creep, towers[0]);
				}
				else {
					// if no tower, repair structure
					var targets = creep.room.find(FIND_STRUCTURES, {
						filter: object => { return object.hits < object.hitsMax }
					});
					targets.sort((a, b) => a.hits - b.hits);
					if (targets.length > 0) {
						operationBasic.repairStructure(creep, targets[0]);
					}
					else {
						// if no structure to repair, upgrade controller
						operationBasic.upgradeController(creep, creep.room.controller);
					}
				}
			}
		}
		else {
			// harvest from container if container is not empty
			var containers = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER)
				}
			});
			if (containers[0].store[RESOURCE_ENERGY] > 550) {
				operationBasic.getEnergyFromContainerOrStorage(creep, containers[0]);
			}
			else {
				operationBasic.getEnergyFromContainerOrStorage(creep, containers[creep.memory.index % 2 + 1]);
			}
		}
	}
};

module.exports = roleBuilder;