import { log } from "console";

// export
export default function () {
    _.assign(Creep.prototype, creepExtension);
}

const creepExtension = {
    // harvest from source
    harvestSource(source: Source) {
        const hasHarvest = this.harvest(source);
        if (hasHarvest == ERR_NOT_IN_RANGE) {
            this.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
            return OK;
        }
        return hasHarvest;
    },

    // get energy from container
    getEnergyFromContainer(container: StructureContainer | STRUCTURE_STORAGE) {
        const hasWithdraw = this.withdraw(container, RESOURCE_ENERGY);
        const tombstone = this.room.find(FIND_TOMBSTONES, {
            filter: (tombstone) => {
                return tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        })[0];
        if (hasWithdraw == ERR_NOT_IN_RANGE) {
            this.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
            return OK;
        }
        if (tombstone) {
            this.withdraw(tombstone, RESOURCE_ENERGY);
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
        // console.log(targets);

        if (targets.length > 0) {
            if (this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
                return OK;
            }
        }
        else {
            return ERR_NOT_FOUND;
        }
    },

    // fill Tower in the room
    fillTower() {
        const towers = this.room.find(FIND_STRUCTURES, {
            filter: (structure: StructureTower) => {
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
        else {
            return ERR_NOT_FOUND;
        }
    },

    // fill Container
    fillContainer(container: StructureContainer) {
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
    buildConstructionSite(target: ConstructionSite) {
        const hasBuild = this.build(target);
        if (hasBuild == ERR_NOT_IN_RANGE) {
            this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasBuild;
    },

    // repair structure
    repairStructure(target: Structure) {
        const hasRepair = this.repair(target);
        if (hasRepair == ERR_NOT_IN_RANGE) {
            this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasRepair;
    },

    // upgrade controller
    upgrade(controller: StructureController) {
        const hasUpgrade = this.upgradeController(controller);
        if (hasUpgrade == ERR_NOT_IN_RANGE && controller.id != '656c0bb791c07c1a2bbf06f7') {
            this.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        else if (hasUpgrade == ERR_NOT_IN_RANGE && controller.id == '656c0bb791c07c1a2bbf06f7') {
            this.moveTo(new RoomPosition(19, 9, 'W33N51'), { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 5 });
            return OK;
        }
        return hasUpgrade;
    },

    // move to room W33N53 accross W33N54
    moveToTargetRoom(targetRoom: string, passRoom: string) {
        if (this.room.name != passRoom && this.room.name != targetRoom) {
            this.moveTo(new RoomPosition(25, 25, passRoom), { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 20 });
        }
        else {
            // console.log("move to target room");
            this.moveTo(new RoomPosition(31, 10, targetRoom), { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
        }
        return OK;
    }
}