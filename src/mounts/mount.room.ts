

// export
export default function () {
    _.assign(Room.prototype, roomExtension);
}

const roomExtension = {
    defendRoom() {
        const hostiles = this.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            // const username = hostiles[0].owner.username;
            // Game.notify(`User ${username} spotted in room ${this.room.name}`);
            const towers = this.find(FIND_STRUCTURES, {
                filter: (structure: StructureTower) => {
                    return (structure.structureType == STRUCTURE_TOWER);
                }
            });
            towers.forEach((tower: StructureTower) => tower.attack(hostiles[0]));
        }
    },

    // find containers in the room
    findContainers() {
        const containers: StructureContainer[] = this.find(FIND_STRUCTURES, {
            filter: (structure: StructureContainer) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
        });
        return containers;
    },

    // find construction sites in the room
    findConstructionSites() {
        const constructionSites: ConstructionSite[] = this.find(FIND_CONSTRUCTION_SITES);
        return constructionSites;
    }

}