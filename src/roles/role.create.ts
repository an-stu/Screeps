
/** Creep生产函数**/
function createCreep(role: string, NUM: number, body: Array<BodyPartConstant>, spawnName = 'Spawn1', roomName = 'W31N55') {
    const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName);
    Game.rooms[roomName].memory[role] = creeps.length;
    if (creeps.length < NUM) {
        for (let i = 0; i < NUM; i++) {
            var newName = role.charAt(0).toUpperCase() + role.slice(1) + roomName + i.toString();
            if (newName == 'HarvesterW31N552' || newName == 'HarvesterW31N553') {
                body = createBody(4, 2, 3)
            }
            if (!Game.spawns[spawnName].spawnCreep(body, newName,
                { memory: { role: role, index: i, room: roomName } })) {
                console.log('[create] Spawning new ' + role + ': ' + newName);
                break;
            }
        }
    }

    // 可视化显示产生
    if (Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name]
        Game.spawns[spawnName].room.visual.text(
            '🛠' + spawningCreep.name,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y,
            { align: 'left', opacity: 0.8 }
        );
    }
}

// Creep身体部件生成函数
function createBody(NumOfWork: number, NumOfCarry: number, NumOfMove: number, NumOfAttack = 0, NumOfTough = 0) {
    var body = [];
    for (let i = 0; i < NumOfTough; i++) {
        body.push(TOUGH);
    }
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

export var roleCreate = {
    /* Create creeps, Keep the number of creeps */
    create: function () {
        const NUM_HARVESTER = 4;
        const NUM_UPGRADER = 2;
        const NUM_BUILDER = 1;
        const NUM_CARRIER = 3;
        const NUM_REPAIRER = 1;
        const NUM_SCOUT = 0;
        const NUM_ATTACKER = 1;
        const ROOM1 = Game.rooms['W31N55'];
        const ROOM2 = Game.rooms['W33N53'];
        // delete useless harvester
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('[delete] Clearing non-existing creep memory: ', name);
            }
        }
        createCreep('harvester', NUM_HARVESTER, createBody(5, 0, 2));
        createCreep('carrier', NUM_CARRIER, createBody(0, 16, 8));
        // createCreep('claimer', 1, [CLAIM, MOVE]);
        if (Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS).length > 2) {
            createCreep('attacker', NUM_ATTACKER, createBody(0, 0, 8, 10, 6));
            console.log('Enemy: ' + Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS)[0].name);
        }

        if (ROOM1.memory.carrier == 0) {
            createCreep('carrier', 1, createBody(0, 3, 3));
        }

        if (ROOM1.memory.carrier >= NUM_CARRIER && ROOM1.memory.harvester > 3) {
            createCreep('upgrader', NUM_UPGRADER, createBody(10, 2, 6));
            createCreep('builder', NUM_BUILDER, createBody(5, 5, 10));
            createCreep('repairer', NUM_REPAIRER, createBody(3, 3, 3));
            createCreep('scout', NUM_SCOUT, [WORK, CARRY, MOVE, WORK, WORK, MOVE]);
        }


        /***********************       Room W33N53         ****************************/

        createCreep('harvester', 2, createBody(3, 0, 1), 'Spawn2', 'W33N53');
        createCreep('carrier', 2, createBody(0, 4, 2), 'Spawn2', 'W33N53');
        if (ROOM2.memory.carrier >= 2, ROOM2.memory.harvester >= 2) {
            createCreep('upgrader', 2, createBody(2, 1, 1), 'Spawn2', 'W33N53');
            createCreep('builder', 1, createBody(1, 1, 2), 'Spawn2', 'W33N53');
            createCreep('repairer', 1, createBody(1, 1, 2), 'Spawn2', 'W33N53');
        }
    }
};