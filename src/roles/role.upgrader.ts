

export var roleUpgrader = {
    run: function (creep: Creep) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            creep.upgrade(creep.room.controller);
        }
        else {
            if (creep.room.name == 'W31N55') {
                // harvest from containerNearController
                const pos = new RoomPosition(19, 10, 'W31N55');
                const upgraderContainer: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.pos.isEqualTo(pos))
                    }
                });
                creep.getEnergyFromContainer(upgraderContainer[0]);
            }
            else {
                // harvest from containerNearSource
                const upgraderContainer = creep.room.findContainers()[2];
                creep.getEnergyFromContainer(upgraderContainer);
            }
        }
    }
};
