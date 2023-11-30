const operationBasic = require("./operation.basic");

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => { return object.hits < object.hitsMax && object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_RAMPART }
            });
            targets.sort((a, b) => a.hits - b.hits);
            if (targets.length > 0) {
                operationBasic.repairStructure(creep, targets[0]);
            }
            else {
                // build construction sites
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    operationBasic.buildConstructionSite(creep, targets[0]);
                }
            }
        } else {
            // harvest from container if container is not empty
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            operationBasic.getEnergyFromContainerOrStorage(creep, containers[0]);
        }
    }
};

module.exports = roleRepairer;