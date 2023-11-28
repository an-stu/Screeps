/** Creep生产函数 @param {String, Int, Array}  **/
function createCreep(role, NUM, body) {
    var Mycreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    Memory[role] = Mycreeps.length;
    // Creep小于NUM则新创建一个0
    if (Mycreeps.length < NUM && Game.spawns['Spawn1'].spawnCreep(body, "test", { dryRun: true }) == 0) {
        for (let i = 0; i < NUM; i++) {
            const name = role.charAt(0).toUpperCase() + role.slice(1) + i.toString();
            if (!Game.creeps[name]) {
                console.log('Spawning new ' + role + ': ' + name);
                Game.spawns['Spawn1'].spawnCreep(body, name, {
                    memory: { role: role }, directions: [BOTTOM]
                });
            }
        }
    }
    // 可视化显示产生
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]
        Game.spawns['Spawn1'].room.visual.text(
            '🛠' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 }
        );
    }
}

var roleCreate = {
    /* @param */
    create: function () {
        const NUM_HARVESTER = 4;
        const NUM_UPGRADER = 9;
        const NUM_BUILDER = 5;
        const NUM_REPAIRER = 2;
        // delete useless harvester
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory: ', name);
            }
        }
        createCreep('harvester', NUM_HARVESTER, [WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE]);
        createCreep('upgrader', NUM_UPGRADER, [WORK, CARRY, MOVE, MOVE, WORK, CARRY, WORK, MOVE]);
        createCreep('builder', NUM_BUILDER, [WORK, CARRY, MOVE, WORK, WORK, CARRY, CARRY, MOVE]);
        createCreep('repairer', NUM_REPAIRER, [WORK, CARRY, MOVE, WORK, WORK, CARRY, MOVE])
    }
};

module.exports = roleCreate;