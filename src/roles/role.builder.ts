export var roleBuilder = {
	run: function (creep: Creep) {
		const room = creep.room;
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}
		if (creep.memory.building) {
			// console.log(creep.name, creep.room.name);
			if (room.controller.level < 2) {
				// upgrade controller
				if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
				}
				// console.log("upgrading controller");
			}
			else {
				var constructions = room.find(FIND_CONSTRUCTION_SITES);
				if (constructions.length) {
					creep.buildConstructionSite(constructions[0]);
				}
				else {
					// if no construction site, fill tower
					if (creep.fillTower()) {
						// if no tower, repair structure
						var structures = room.find(FIND_STRUCTURES, {
							filter: object => { return object.hits < object.hitsMax && object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_WALL; }
						});
						structures.sort((a, b) => a.hits - b.hits);
						if (structures.length > 0) {
							creep.repairStructure(structures[0]);
						}
						else {
							// if no structure to repair, upgrade controller
							creep.upgrade(room.controller);
						}
					}
				}
			}
		}
		else {
			// harvest from container if container is not empty
			var containers: StructureContainer[] = room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER)
				}
			});
			if (containers[0] && containers[0].store[RESOURCE_ENERGY] > 0) {
				creep.getEnergyFromContainer(containers[0]);
			}
			else {
				// harvest from storage if container is empty
				var storage = room.storage;
				if (storage && storage.store[RESOURCE_ENERGY] > 0) {
					creep.getEnergyFromContainer(storage);
				}
				else {
					// harvest from source
					var sources = room.find(FIND_SOURCES);
					const source_index = creep.memory.index;
					if (creep.harvestSource(sources[source_index]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(sources[source_index], { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
					}
				}
			}
		}
	}
};
