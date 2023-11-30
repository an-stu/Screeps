var operationBasic = require('./operation.basic');

var roleHarvester = {
    // only harvest from source without anything
    /** @param {Creep} creep **/
    run: function (creep) {
        const source_index = creep.memory.index;
        if (source_index < 2) {
            let source = creep.room.find(FIND_SOURCES)[source_index];
            let containers = [];
            containers[0] = Game.getObjectById('6568255cf34d30b9a22a6ddc');
            containers[1] = Game.getObjectById('6566ef5b96a88969486643f0');
            const container = containers[source_index];
            if (!creep.pos.isEqualTo(container.pos)) {
                creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            else {
                creep.harvest(source);
            }
        }
        else if (source_index == 2) {
            // move to the bottom room
            if (creep.room.name != 'W31N54') {
                creep.moveTo(new RoomPosition(40, 29, 'W31N54'), { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                return;
            }
            else {
                // harvest source from bottom room
                let source = creep.room.find(FIND_SOURCES)[0];
                let construcion = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
                let container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                })[0];
                operationBasic.getEnergyFromSource(creep, source);
                if (construcion && creep.store.getFreeCapacity() == 0) {
                    creep.build(construcion);
                }
                else if (container) {
                    if (!creep.pos.isEqualTo(container.pos)) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                    }
                    else {
                        operationBasic.getEnergyFromSource(creep, source);
                        if (container.hits < 120000) {
                            // repair container
                            creep.repair(container);
                        }
                    }
                }
            }
        }
        else if (source_index == 3) {
            // move to the top room
            if (creep.room.name != 'W31N56') {
                creep.moveTo(new RoomPosition(27, 42, 'W31N56'), { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                return;
            }
            else {
                // harvest source from the top room
                let source = creep.room.find(FIND_SOURCES)[0];
                let construcion = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
                let container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                })[0];
                operationBasic.getEnergyFromSource(creep, source);
                if (construcion && creep.store.getFreeCapacity() == 0) {
                    creep.build(construcion);
                }
                else if (container) {
                    if (!creep.pos.isEqualTo(container.pos)) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                    }
                    else {
                        operationBasic.getEnergyFromSource(creep, source);
                        if (container.hits < 120000) {
                            // repair container
                            creep.repair(container);
                        }
                    }
                }
            }
        }
    }
}
module.exports = roleHarvester;