import mitt from 'mitt';

/**
 * import this emitter into components to send messages globally
 * Usage for Emittion: EventBus.emit('login');
 * Usage for Registering (z.B. Mounted): EventBus.on('login', this.yourFunction);
 */

const emitter = mitt();

export default emitter;
