var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // Only harvest from the source
        var sources = creep.room.find(FIND_SOURCES);
        for (var i = 0; i < sources.length; i++) {
            if (creep.name == 'Harvester' + i.toString()) {
                if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[i], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
                // console.log('Harvester' + i.toString() + ' is harvesting');
            }
        }
    }
};

module.exports = roleHarvester;