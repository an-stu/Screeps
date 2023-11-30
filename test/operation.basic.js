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
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
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
        if (hasWithdraw == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
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
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
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
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
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
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            return OK;
        }
    }
};

module.exports = operationBasic;