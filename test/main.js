var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleCreate = require('role.create');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transferer');

module.exports.loop = function () {
    roleCreate.create();

    // 运行
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'transferer') {
            roleTransferer.run(creep);
        }
    }
}