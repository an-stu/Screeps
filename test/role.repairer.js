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
                filter: object => { return object.hits < object.hitsMax / 2 && object.hits <= 100000 }
            });
            if (targets.length > 0) {
                operationBasic.repairStructure(creep, targets[0]);
            }
            else {
                // upgrade controller
                operationBasic.upgradeController(creep, creep.room.controller);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            operationBasic.getEnergyFromSource(creep, sources[0]);
        }
    }
};

module.exports = roleRepairer;