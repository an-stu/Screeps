// 导入operation.basic
var operationBasic = require('./operation.basic');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {
		const source_index = 0;
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_TOWER)
				}
			});
			// console.log(targets);
			if (targets.length) {
				operationBasic.buildConstructionSite(creep, targets[0]);
			}
			else {
				// if no construcion sites to build, fill containers and towers
				var containers_and_towers = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
					}
				});
				if (containers_and_towers.length) {
					operationBasic.transferEnergyToContainerOrStorage(creep, containers_and_towers[0]);
				}
				else {
					// if no containers to fill, repair structures
					var structures = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (structure.hits < structure.hitsMax && structure.hits < 100000)
						}
					});
					if (structures.length) {
						operationBasic.repairStructure(creep, structures[0]);
					}
					else {
						// if no structures to repair, upgrade controller
						operationBasic.upgradeController(creep, creep.room.controller);
					}
				}
			}
		}
		else {
			// harvest from source 
			var sources = creep.room.find(FIND_SOURCES);
			if (operationBasic.getEnergyFromSource(creep, sources[source_index]) == ERR_NOT_ENOUGH_ENERGY) {
				creep.memory.building = true;
				// // harvest from container if container is not empty
				// var containers = creep.room.find(FIND_STRUCTURES, {
				// 	filter: (structure) => {
				// 		return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
				// 	}
				// });
				// if (containers.length > 1) {
				// 	operationBasic.getEnergyFromContainer(creep, containers[1]);
				// }
			}
		}
	}
};

module.exports = roleBuilder;