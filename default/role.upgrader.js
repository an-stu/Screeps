var operationBasic = require('./operation.basic');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const source_index = 1;
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            operationBasic.upgradeController(creep, creep.room.controller);
        }
        else {
            // harvest from container if container is not empty
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            if (containers.length > 1) {
                operationBasic.getEnergyFromContainer(creep, containers[1]);
            }
            else {
                // harvest from source
                var sources = creep.room.find(FIND_SOURCES);
                operationBasic.getEnergyFromSource(creep, sources[source_index]);
            }
        }
    }
};

module.exports = roleUpgrader;