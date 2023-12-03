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
				creep.buildConstructionSite(targets[0]);
			}
			else {
				// if no construction site, fill tower
				if (!creep.fillTower()) { }
				else {
					// if no tower, repair structure
					var targets = creep.room.find(FIND_STRUCTURES, {
						filter: object => { return object.hits < object.hitsMax }
					});
					targets.sort((a, b) => a.hits - b.hits);
					if (targets.length > 0) {
						creep.repairStructure(targets[0]);
					}
					else {
						// if no structure to repair, upgrade controller
						creep.upgrade(creep.room.controller);
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
			if (containers[0].store[RESOURCE_ENERGY] > 0) {
				creep.getEnergyFromContainer(containers[0]);
			}
			else {
				// harvest from storage if container is empty
				var storage = creep.room.storage;
				creep.getEnergyFromContainer(storage);
			}
		}
	}
};

module.exports = roleBuilder;