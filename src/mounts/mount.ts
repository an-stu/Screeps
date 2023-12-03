import mountCreep from './mount.creep';
import mountRoom from './mount.room';

export var mount = function () {
    console.log('[mount] mount for creeps');
    console.log('[mount] mount for rooms');
    mountCreep();
    mountRoom();
};
