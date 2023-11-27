var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let source_index = 1;
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🚧 transfer');
        }
        if (!creep.memory.transfering) {
            // harvest
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[source_index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[source_index], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else {
                // build
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION);
                    }
                });
                if (targets.length > 0) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;