var operationBasic = require('./operation.basic');

var roleHarvester = {
    // only harvest from source without anything
    /** @param {Creep} creep **/
    run: function (creep) {
        const source_index = creep.memory.index;
        if (source_index < 2) {
            let source = creep.room.find(FIND_SOURCES)[source_index];
            let container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
            })[source_index + 1];
            if (creep.pos != container.pos) {
                creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            else {
                creep.harvest(source);
            }
        }
        else if (source_index == 2) {
            // harvest source from bottom room
            let source = Game.getObjectById('5bbcab3c9099fc012e633272');

        }

    }
};

module.exports = roleHarvester;