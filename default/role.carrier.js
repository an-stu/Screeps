const operationBasic = require("./operation.basic");

var roleCarrier = {
    // only transfer energy to other containers or storage
    /** @param {Creep} creep **/
    run: function (creep) {
        let index = creep.memory.index;
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🚧transfer');
        }
        if (!creep.memory.transfering) {
            if (Memory.harvester < 2) {
                // prevent harvester died
                container0 = Game.getObjectById('65648574861a675c9ef13d37');
                storage = creep.room.storage;
                if (container0.store[RESOURCE_ENERGY] > 0) {
                    creep.getEnergyFromContainer(container0);
                }
                else if (storage.store[RESOURCE_ENERGY] > 0) {
                    creep.getEnergyFromContainer(storage);
                }
            }
            else {
                // harvest from container if container is not empty
                let containers = [];
                containers[0] = Game.getObjectById('6568255cf34d30b9a22a6ddc');
                containers[1] = Game.getObjectById('6566ef5b96a88969486643f0');
                containers[3] = Game.getObjectById('656809351d3a4ea1376ab99b');
                containers[2] = Game.getObjectById('6567b20ccca15c20bd9510ab');
                // console.log(containers[3]);
                const containerNearSource = containers[index % 4];
                creep.getEnergyFromContainer(containerNearSource);
            }
        }
        else {
            // some logic to decide which container to transfer energy to
            if (index % 4 < 2 && creep.room.name == 'W31N55') {
                // transfer to spawn and extension 
                if (creep.fillSpawnAndExtension()) {
                    // transfer to container
                    const containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER)
                        }
                    });
                    if (containers[0].store.getFreeCapacity(RESOURCE_ENERGY) > 300) {
                        operationBasic.transferEnergyToContainerOrStorage(creep, containers[0]);
                    }
                    else {
                        // transfer to upgrader container
                        const pos = new RoomPosition(14, 7, 'W31N55');
                        const upgraderContainer = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER && structure.pos.isEqualTo(pos))
                            }
                        })[0];
                        if (upgraderContainer && upgraderContainer.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
                            operationBasic.transferEnergyToContainerOrStorage(creep, upgraderContainer);
                        }
                        else {
                            // transfer to storage
                            const storage = creep.room.storage;
                            if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                                operationBasic.transferEnergyToContainerOrStorage(creep, storage);
                            }
                        }
                    }
                }
            }
            else {
                // transfer to container
                const upgraderContainer = Game.getObjectById('65684233fd525c288cd03d14');
                if (upgraderContainer && upgraderContainer.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    operationBasic.transferEnergyToContainerOrStorage(creep, upgraderContainer);
                }
                else {
                    // transfer to storage
                    const storage = Game.rooms['W31N55'].storage;
                    if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        operationBasic.transferEnergyToContainerOrStorage(creep, storage);
                    }
                }
            }
        }
    }
};

module.exports = roleCarrier;