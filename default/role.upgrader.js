var operationBasic = require('./operation.basic');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

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
            // harvest from containerNearController
            const pos = new RoomPosition(14, 7, 'W31N55');
            const upgraderContainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.pos.isEqualTo(pos))
                }
            })[0];
            operationBasic.getEnergyFromContainer(creep, upgraderContainer);
        }
    }
};

module.exports = roleUpgrader;