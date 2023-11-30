var roleCarrier = {
    // only transfer energy to other containers or storage
    /** @param {Creep} creep **/
    run: function (creep) {
        const index = creep.memory.index;
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🚧transfer');
        }
        if (!creep.memory.transfering) {
            // harvest from container if container is not empty
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
            });
            const containerNearSource = containers[index % 2 + 1];
            if (containerNearSource.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(containerNearSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerNearSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        else {
            // some logic to decide which container to transfer energy to
            if (index % 4 == 2) {
                // transfer to upgrader container
                const upgraderContainer = Game.getObjectById();
                if (creep.transfer(upgraderContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(upgraderContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else if (index % 4 < 2) {
                // transfer to spawn and extension 
                const targets = creep.room.find(FIND_STRUCTURES, {
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
                    // transfer to upgrader container
                    const upgraderContainer = Game.getObjectById();
                    if (creep.transfer(upgraderContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgraderContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
            else {
                // transfer to container
                const containerForBuilder = Game.getObjectById('65648574861a675c9ef13d37');
                if (creep.transfer(containerForBuilder, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerForBuilder, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleCarrier;