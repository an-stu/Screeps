var roleCreate = {
    /* @param */
    create: function () {
        const NUM_HARVESTER = 3;
        const NUM_UPGRADER = 3;
        const NUM_BUILDER = 4;
        // delete useless harvester
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory: ', name);
            }
        }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        // Harvester小于NUM则新创建一个
        if (harvesters.length < NUM_HARVESTER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK], newName, {
                memory: { role: 'harvester' }
            });
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

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        // upgrader小于NUM则新创建一个
        if (upgraders.length < NUM_UPGRADER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
                memory: { role: 'upgrader' }
            });
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

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // builder小于NUM则新创建一个
        if (builders.length < NUM_BUILDER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK], newName, {
                memory: { role: 'builder' }
            });
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
};

module.exports = roleCreate;