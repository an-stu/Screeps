var roleAttacker = {
    /** @param {Creep} creep **/
    run: function (creep) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            // move to the rampart
            const rampart = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { return (structure.structureType == STRUCTURE_RAMPART) }
            })[0];
            if (rampart) {
                creep.moveTo(rampart);
                creep.heal(creep);
            }
        }
    }
};

module.exports = roleAttacker;
