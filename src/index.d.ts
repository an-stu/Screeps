interface CreepMemory {
    role: string;
    index?: number;
    building?: boolean;
    transferring?: boolean;
    repairing?: boolean;
    upgrading?: boolean;
    room: string;
}

interface Creep {
    harvestSource(source: Source): number;
    getEnergyFromContainer(container: StructureContainer | StructureStorage): number;
    fillSpawnAndExtension(): number;
    fillTower(): number;
    fillContainer(container: StructureContainer): number;
    fillStorage(storage: StructureStorage): number;
    buildConstructionSite(constructionSite: ConstructionSite): number;
    repairStructure(structure: Structure): number;
    upgrade(controller: StructureController): number;
    moveToTargetRoom(targetRoom: string, passRoom: string): number;
}

interface Memory {
    harvester: number;
    upgrader: number;
    builder: number;
    repairer: number;
    carrier: number;
    scout: number;
    attacker: number;
    claimer: number;
}

interface Room {
    defendRoom(): void;
    findContainers(): StructureContainer[];
    findConstructionSites(): ConstructionSite[];
}

interface RoomMemory {
    harvester: number;
    upgrader: number;
    builder: number;
    repairer: number;
    carrier: number;
    scout: number;
    attacker: number;
    claimer: number;
}
