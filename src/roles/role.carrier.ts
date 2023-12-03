export var roleCarrier = {
    // only transfer energy to other containers or storage
    run: function (creep: Creep) {
        let index = creep.memory.index;
        if (creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferring = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transferring && creep.store.getFreeCapacity() == 0) {
            creep.memory.transferring = true;
            creep.say('🚧transfer');
        }
        if (!creep.memory.transferring) {
            if (Game.rooms['W31N55'].memory.harvester < 3 && creep.memory.room == 'W31N55') {
                // prevent harvester died
                let container0: StructureContainer = Game.getObjectById('65648574861a675c9ef13d37');
                let storage = Game.rooms['W31N55'].storage;
                // console.log(storage);
                if (container0.store[RESOURCE_ENERGY] > 0) {
                    creep.getEnergyFromContainer(container0);
                }
                else if (storage.store[RESOURCE_ENERGY] > 0) {
                    creep.getEnergyFromContainer(storage);
                }
            }
            else {
                if (creep.memory.room == 'W31N55') {
                    // harvest from container if container is not empty
                    var containers = [];
                    containers[0] = Game.getObjectById('6568255cf34d30b9a22a6ddc');
                    containers[1] = Game.getObjectById('6566ef5b96a88969486643f0');
                    containers[3] = Game.getObjectById('656809351d3a4ea1376ab99b');
                    containers[2] = Game.getObjectById('6567b20ccca15c20bd9510ab');
                }
                else {
                    containers = creep.room.findContainers();
                }
                // console.log(containers[3]);
                const containerNearSource = containers[index];
                creep.getEnergyFromContainer(containerNearSource);
            }
        }
        else {
            // some logic to decide which container to transfer energy to
            if (index % 4 < 2 && (creep.room.name == 'W31N55' || creep.room.name == 'W33N53')) {
                // transfer to spawn and extension 
                if (creep.fillSpawnAndExtension()) {
                    // transfer to container
                    const containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER)
                        }
                    });
                    if (containers[0].store.getFreeCapacity(RESOURCE_ENERGY) > 700 && creep.memory.room == 'W31N55') {
                        creep.fillContainer(containers[0]);
                    }
                    else {
                        // transfer to upgrader container
                        if (creep.memory.room == 'W31N55') {
                            var upgraderContainer: StructureContainer = Game.getObjectById('6569ef5b7661a41b0f9dacda');
                        }
                        else {
                            var upgraderContainer: StructureContainer = creep.room.findContainers()[2];
                        }
                        if (upgraderContainer && upgraderContainer.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                            creep.fillContainer(upgraderContainer);
                        }
                        else {
                            // transfer to storage
                            const storage = creep.room.storage;
                            if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                                creep.fillStorage(storage);
                            }
                        }
                    }
                }
            }
            else {
                // transfer to container
                const upgraderContainer: StructureContainer = Game.getObjectById('6569ef5b7661a41b0f9dacda');
                if (upgraderContainer && upgraderContainer.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.fillContainer(upgraderContainer);
                }
                else {
                    // transfer to storage
                    const storage = Game.rooms['W31N55'].storage;
                    if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        creep.fillStorage(storage);
                    }
                }
                // throw new Error('Carrier Error');
            }
        }
    }
};
