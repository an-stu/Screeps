var operationBasic = require('./operation.basic');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let source_index = 0;
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🚧transfer');
        }
        if (!creep.memory.transfering) {
            // harvest from source 
            var sources = creep.room.find(FIND_SOURCES);
            if (operationBasic.getEnergyFromSource(creep, sources[source_index]) == ERR_NOT_ENOUGH_ENERGY) {
                // harvest from container if container is not empty
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                    }
                });
                if (containers.length > 1) {
                    operationBasic.getEnergyFromContainer(creep, containers[1]);
                }
            }
        }
        else {
            // transfer to spawn or extension
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                operationBasic.transferEnergyToSpawnOrExtension(creep, targets[0]);
            }
            else {
                // transfer to container
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    }
                });
                if (containers.length) {
                    operationBasic.transferEnergyToContainerOrStorage(creep, containers[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;