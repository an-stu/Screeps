var operationBasic = require('./operation.basic');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const containerNearController = Game.getObjectById();
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
            operationBasic.getEnergyFromContainer(creep, containerNearController);
        }
    }
};

module.exports = roleUpgrader;