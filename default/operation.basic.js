var operationBasic = {
    /** 
     * 从指定的source中获取能量
     * @param {Creep} creep 
     * @param {Source} source
     * @return {Number} 0成功,ERR_NOT_ENOUGH_ENERGY能量不足
    **/
    getEnergyFromSource: function (creep, source) {
        let hasHarvest = creep.harvest(source);
        if (hasHarvest == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            return OK;
        }
        else if (hasHarvest == ERR_NOT_ENOUGH_RESOURCES) {
            creep.say('No Energy');
            return ERR_NOT_ENOUGH_ENERGY;
        }
    },

    /**
     * 从指定的container中获取能量
     * @param {Creep} creep
     * @param {StructureContainer} container
     */
    getEnergyFromContainer: function (creep, container) {
        let hasWithdraw = creep.withdraw(container, RESOURCE_ENERGY);
        // console.log(hasWithdraw);
        if (hasWithdraw == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            return OK;
        }
        else if (hasWithdraw == ERR_NOT_ENOUGH_RESOURCES) {
            creep.say('No Energy');
            return ERR_NOT_ENOUGH_ENERGY;
        }
    },

    /**
     * 给指定的spawn或extension充能
     * @param {Creep} creep
     * @param {StructureSpawn|StructureExtension} target
     */
    transferEnergyToSpawnOrExtension: function (creep, target) {
        let hasTransfer = creep.transfer(target, RESOURCE_ENERGY);
        if (hasTransfer == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
            return OK;
        }
        else if (hasTransfer == ERR_FULL) {
            creep.say('Full');
            return ERR_FULL;
        }
    },

    /**
     * Upgrade controller
     * @param {Creep} creep
     * @param {StructureController} controller
     */
    upgradeController: function (creep, controller) {
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
            return OK;
        }
    },

    /**
     * Build construction site
     * @param {Creep} creep
     * @param {ConstructionSite} site
     */
    buildConstructionSite: function (creep, site) {
        if (creep.build(site) == ERR_NOT_IN_RANGE) {
            creep.moveTo(site, { visualizePathStyle: { stroke: '#ffffff' } });
            return OK;
        }
    },

    /**
     * transfer energy to container or storage or tower 
     * @param {Creep} creep
     * @param {StructureContainer|StructureStorage|StructureTower} target
     */
    transferEnergyToContainerOrStorage: function (creep, target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
            return OK;
        }
    },

    /**
     * repair structure
     * @param {Creep} creep
     * @param {Structure} target
     */
    repairStructure: function (creep, target) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
            return OK;
        }
    },

    /**
     * defend room from invaders
     * @param {String} roomName
     */
    defendRoom: function (roomName) {
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        // console.log(hostiles);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            towers.forEach(tower => tower.attack(hostiles[0]));
        }

    }
};

module.exports = operationBasic;