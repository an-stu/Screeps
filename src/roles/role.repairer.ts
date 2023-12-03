export var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            // repair structure
            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: object => { return object.hits < object.hitsMax && object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_RAMPART }
            });
            structures.sort((a, b) => a.hits - b.hits);
            if (structures.length > 0) {
                creep.repairStructure(structures[0]);
            }
            else {
                // build construction sites
                var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (constructions.length) {
                    creep.buildConstructionSite(constructions[0]);
                }
            }
        } else {
            // harvest from container if container is not empty
            var containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            if (containers.length > 0) {
                creep.getEnergyFromContainer(containers[0]);
            }
            else {
                // harvest from storage if container is empty
                var storage = creep.room.storage;
                if (storage) {
                    creep.getEnergyFromContainer(storage);
                }
            }
        }
    }
};
