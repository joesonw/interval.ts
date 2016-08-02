"use strict";
const events_1 = require('events');
class Interval extends events_1.EventEmitter {
    constructor(task, delay) {
        super();
        this.alive = false;
        this.delay = -1;
        this.timer = undefined;
        this.task = undefined;
        this.task = task;
        this.delay = delay;
    }
    tick() {
        if (this.alive) {
            this.task()
                .then(_ => {
                this.timer = setTimeout(() => this.tick(), this.delay);
            })
                .catch(err => {
                this.emit('error', err);
            });
        }
    }
    start() {
        if (this.alive) {
            return;
        }
        this.alive = true;
        this.tick();
    }
    pause(delay) {
        this.alive = false;
        clearTimeout(this.timer);
        setTimeout(() => this.start(), delay);
    }
    stop() {
        this.alive = false;
        clearTimeout(this.timer);
    }
    adjust(delay) {
        this.delay = delay;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Interval;
//# sourceMappingURL=index.js.map