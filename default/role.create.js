const operationBasic = require("./operation.basic");

/** Creep生产函数 @param {String, Int, Array}  **/
function createCreep(role, NUM, body) {
    var Mycreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    Memory[role] = Mycreeps.length;
    // Creep小于NUM则新创建一个0
    if (Mycreeps.length < NUM && Game.spawns['Spawn1'].spawnCreep(body, "test", { dryRun: true }) == 0) {
        for (let i = 0; i < NUM; i++) {
            const name = role.charAt(0).toUpperCase() + role.slice(1) + i.toString();
            if (!Game.creeps[name]) {
                if (name == 'Harvester2' || name == 'Harvester3') {
                    body = [WORK, WORK, WORK, MOVE, MOVE, CARRY]
                }
                if (Game.spawns['Spawn1'].spawnCreep(body, name, {
                    memory: { role: role, index: i }, directions: [BOTTOM]
                }) == OK) {
                    console.log('Spawning new ' + role + ': ' + name);
                    break;
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

function createBody(NumOfWork, NumOfCarry, NumOfMove, NumOfAttack) {
    var body = [];
    for (let i = 0; i < NumOfWork; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < NumOfCarry; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < NumOfMove; i++) {
        body.push(MOVE);
    }
    for (let i = 0; i < NumOfAttack; i++) {
        body.push(ATTACK);
    }
    return body;
}

var roleCreate = {
    /* Create creeps, Keep the number of creeps */
    create: function () {
        const NUM_HARVESTER = 4;
        const NUM_UPGRADER = 2;
        const NUM_BUILDER = 1;
        const NUM_CARRIER = 10;
        const NUM_REPAIRER = 1;
        const NUM_SCOUT = 0;
        const NUM_ATTACKER = 1;
        // delete useless harvester
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory: ', name);
            }
        }
        createCreep('harvester', NUM_HARVESTER, createBody(5, 0, 2, 0));
        createCreep('carrier', NUM_CARRIER, createBody(0, 8, 8, 0));

        if (Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS).length > 0) {
            createCreep('attacker', NUM_ATTACKER, [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]);
        }

        if (Memory.carrier == NUM_CARRIER && Memory.harvester > 3) {
            createCreep('upgrader', NUM_UPGRADER, createBody(10, 2, 6, 0));
            createCreep('builder', NUM_BUILDER, [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]);
            createCreep('repairer', NUM_REPAIRER, [WORK, WORK, CARRY, CARRY, MOVE, MOVE]);
            createCreep('scout', NUM_SCOUT, [WORK, CARRY, MOVE, WORK, WORK, MOVE]);
        }
    }
};

module.exports = roleCreate;