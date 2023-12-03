import { errorMapper } from './modules/errorMapper'
import { roleHarvester } from './roles/role.harvester';
import { roleUpgrader } from './roles/role.upgrader';
import { roleBuilder } from './roles/role.builder';
import { roleRepairer } from './roles/role.repairer';
import { roleScout } from './roles/role.scout';
import { roleCarrier } from './roles/role.carrier';
import { roleAttacker } from './roles/role.attacker';
import { roleCreate } from './roles/role.create';
import { roleClaimer } from './roles/role.claimer';
import { mount } from './mounts/mount';


// 挂载
mount();

module.exports.loop = errorMapper(() => {
    // 生成creep
    roleCreate.create();
    // defend room
    Game.rooms['W31N55'].defendRoom();
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
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'scout') {
            roleScout.run(creep);
        }
        if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
    }
});