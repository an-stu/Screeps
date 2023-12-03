export var roleScout = {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {
        if (creep.room.name == "W31N55") {
            creep.moveTo(20, 48, { visualizePathStyle: { stroke: '#ffffff' } });
            if (creep.pos.x == 20 && creep.pos.y == 48) {
                creep.move(BOTTOM);
            }
        }
        else if (creep.room.name == "W31N56") {
            if (creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.transferring = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.transferring && creep.store.getFreeCapacity() == 0) {
                creep.memory.transferring = true;
                creep.say('🚧 transfer');
            }
            if (!creep.memory.transferring) {
                // harvest from source 
                var sources = creep.room.find(FIND_SOURCES);
                creep.harvestSource(sources[0]);
            }
            else {
                // build construction sites
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    creep.buildConstructionSite(targets[0]);
                }
                else {
                    // fill container
                    let containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                        }
                    });
                    if (containers.length) {
                        creep.fillContainer(containers[0]);
                    }
                    else {
                        // repair containers
                        let containers = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax)
                            }
                        });
                        if (containers.length) {
                            creep.repairStructure(containers[0]);
                        }
                    }
                }
            }
        }
    }
};
