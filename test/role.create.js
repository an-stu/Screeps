var roleCreate = {
    /* @param */
    create: function () {
        const NUM_TRANSFERER = 2;
        const NUM_UPGRADER = 1;
        const NUM_BUILDER = 0;
        const NUM_HARVESTER = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length;

        /*********  Harvester Create  ********/
        // delete useless harvester
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                Memory.deadnames = name;
                Memory.deadrole = Memory.creeps[name].role;
                delete Memory.creeps[name];
                console.log('Renew Creep: ', name);
            }
        }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        // Harvester小于NUM则新创建一个
        if (harvesters.length < NUM_HARVESTER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            if (Memory.names && Memory.deadrole == 'harvester') {
                var newName = Memory.names;
            }
            else {
                var newName = 'Harvester' + harvesters.length.toString();
            }
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
                memory: { role: 'harvester' }
            });
            delete Memory.names;
            delete Memory.deadrole;
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

        /*********  Upgrader Create  ********/
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        // upgrader小于NUM则新创建一个
        if (upgraders.length < NUM_UPGRADER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            if (Memory.names && Memory.deadrole == 'upgrader') {
                var newName = Memory.names;
            }
            else {
                var newName = 'Upgrader' + upgraders.length.toString();
            }
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
                memory: { role: 'upgrader' }
            });
            delete Memory.names;
            delete Memory.deadrole;
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

        /*********  Builder Create  ********/
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // builder小于NUM则新创建一个
        if (builders.length < NUM_BUILDER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            if (Memory.names && Memory.deadrole == 'builder') {
                var newName = Memory.names;
            }
            else {
                var newName = 'Builder' + builders.length.toString();
            }
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
                memory: { role: 'builder' }
            });
            delete Memory.names;
            delete Memory.deadrole;
        }

        // 可视化显示产生
        if (Game.spawns['Spawn1'].spawning && Memory.deadrole == 'builder') {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]
            Game.spawns['Spawn1'].room.visual.text(
                '🛠' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 }
            );
        }

        /*********  Transferer Create  ********/
        var transferers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transferer');
        // transferer小于NUM则新创建一个
        if (transferers.length < NUM_TRANSFERER && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            if (Memory.names && Memory.deadrole == 'transferer') {
                var newName = Memory.names;
            }
            else {
                var newName = 'Transferer' + transferers.length.toString();
            }
            console.log('Spawning new transferer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
                memory: { role: 'transferer' }
            });
            delete Memory.names;
            delete Memory.deadrole;
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