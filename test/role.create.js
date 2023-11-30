/** Creep生产函数 @param {String, Int, Array}  **/
function createCreep(role, NUM, body) {
    var Mycreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    Memory[role] = Mycreeps.length;
    // Creep小于NUM则新创建一个0
    if (Mycreeps.length < NUM && Game.spawns['Spawn1'].spawnCreep(body, "test", { dryRun: true }) == 0) {
        for (let i = 0; i < NUM; i++) {
            const name = role.charAt(0).toUpperCase() + role.slice(1) + i.toString();
            if (!Game.creeps[name]) {
                if (Game.spawns['Spawn1'].spawnCreep(body, name, {
                    memory: { role: role, index: i }, directions: [BOTTOM]
                }) == OK) {
                    console.log('Spawning new ' + role + ': ' + name);
                }
            }
        }
    }
    // 可视化显示产生
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]
        Game.spawns['Spawn1'].room.visual.text(
            '🛠' + spawningCreep.name,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 }
        );
    }
}

var roleCreate = {
    /* Create creeps, Keep the number of creeps */
    create: function () {
        const NUM_HARVESTER = 0;
        const NUM_UPGRADER = 0;
        const NUM_BUILDER = 0;
        const NUM_CARRIER = 1;
        const NUM_REPAIRER = 0;
        const NUM_SCOUT = 0;
        // delete useless harvester
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory: ', name);
            }
        }
        createCreep('carrier', NUM_CARRIER, [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]);
        createCreep('harvester', NUM_HARVESTER, [WORK, WORK, WORK, WORK, WORK, MOVE]);
        if (Memory.carrier > 0 && Memory.harvester > 1) {
            createCreep('upgrader', NUM_UPGRADER, [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]);
            createCreep('builder', NUM_BUILDER, [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);
            createCreep('repairer', NUM_REPAIRER, [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);
            createCreep('scout', NUM_SCOUT, [WORK, CARRY, MOVE, WORK, WORK, MOVE]);
        }
    }
};

module.exports = roleCreate;