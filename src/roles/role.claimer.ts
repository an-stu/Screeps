export var roleClaimer = {
    run: function (creep: Creep) {
        const passRoom = 'W33N54';
        const targetRoom = 'W33N53';
        creep.moveToTargetRoom(targetRoom, passRoom);
        if (creep.room.name == targetRoom) {
            const controller = creep.room.controller;
            if (controller) {
                if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
                }
            }
        }
    }
};