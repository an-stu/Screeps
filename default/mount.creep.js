module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

const creepExtension = {
    // harvest from source
    harvestSource(source) {
        const hasHarvest = this.harvest(source);
        if (hasHarvest == ERR_NOT_IN_RANGE) {
            this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
            return OK;
        }
        return hasHarvest;
    },

    // get energy from container
    getEnergyFromContainer(container) {
        const hasWithdraw = this.withdraw(container, RESOURCE_ENERGY);
        if (hasWithdraw == ERR_NOT_IN_RANGE) {
            this.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
            return OK;
        }
        return hasWithdraw;
    },

    // fill Spawn and Extension
    fillSpawnAndExtension() {
        const targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (targets.length > 0) {
            if (this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
                return OK;
            }
        }
        return ERR_NOT_FOUND;
    },

    // fill Tower in the room
    fillTower() {
        const towers = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (towers.length > 0) {
            const hasTransfer = this.transfer(towers[0], RESOURCE_ENERGY);
            if (hasTransfer == ERR_NOT_IN_RANGE) {
                this.moveTo(towers[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
                return OK;
            }
            return hasTransfer;
        }
        return ERR_NOT_FOUND;
    },

    // fill Container
    fillContainer(container) {
        const hasTransfer = this.transfer(container, RESOURCE_ENERGY);
        if (hasTransfer == ERR_NOT_IN_RANGE) {
            this.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasTransfer;
    },

    // fill Storage
    fillStorage() {
        const storage = this.room.storage;
        const hasTransfer = this.transfer(storage, RESOURCE_ENERGY);
        if (hasTransfer == ERR_NOT_IN_RANGE) {
            this.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasTransfer;
    },

    // build construction site
    buildConstructionSite(target) {
        const hasBuild = this.build(target);
        if (hasBuild == ERR_NOT_IN_RANGE) {
            this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasBuild;
    },

    // repair structure
    repairStructure(target) {
        const hasRepair = this.repair(target);
        if (hasRepair == ERR_NOT_IN_RANGE) {
            this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasRepair;
    },

    // upgrade controller
    upgrade(controller) {
        const hasUpgrade = this.upgradeController(controller);
        if (hasUpgrade == ERR_NOT_IN_RANGE) {
            this.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasUpgrade;
    },
}