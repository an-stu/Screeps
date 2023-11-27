var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {

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
					return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_ROAD)
				}
			});
			// console.log(targets);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
			else {
				// if no construcion sites to build, fill containers
				var containers = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
					}
				});
				if (containers.length) {
					if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffffff' } });
					}
				}
				else {
					// if no containers to fill, repair structures
					var structures = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax)
						}
					});
					if (structures.length) {
						if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
							creep.moveTo(structures[0], { visualizePathStyle: { stroke: '#ffffff' } });
						}
					}
					else {
						// if no structures to repair, upgrade controller
						if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
							creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
						}
					}
				}
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			// var source = Game.getObjectById('6564416f3ca4bf14597ae93d');
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

module.exports = roleBuilder;