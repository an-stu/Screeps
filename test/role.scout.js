const operationBasic = require('./operation.basic');

var roleScout = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.room.name == "W31N55") {
            creep.moveTo(20, 48, { visualizePathStyle: { stroke: '#ffffff' } });
            if (creep.pos.x == 20 && creep.pos.y == 48) {
                creep.move(BOTTOM);
            }
        }
        else if (creep.room.name == "W31N54") {
            if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.transfering = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
                creep.memory.transfering = true;
                creep.say('🚧 transfer');
            }
            if (!creep.memory.transfering) {
                // harvest from source 
                var sources = creep.room.find(FIND_SOURCES);
                operationBasic.getEnergyFromSource(creep, sources[0]);
            }
            else {
                // build construction sites
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    operationBasic.buildConstructionSite(creep, targets[0]);
                }
                else {
                    // fill container
                    var containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                        }
                    });
                    if (containers.length) {
                        operationBasic.transferEnergyToContainerOrStorage(creep, containers[0]);
                    }
                    else {
                        // repair containers
                        var containers = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax)
                            }
                        });
                        if (containers.length) {
                            operationBasic.repairStructure(creep, containers[0]);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleScout;