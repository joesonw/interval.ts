import {
    EventEmitter,
} from 'events';

class Interval extends EventEmitter {
    private alive: boolean = false;
    private delay: number = -1;
    private timer = undefined;
    private task: () => Promise<void> = undefined;

    constructor(task: () => Promise<void>, delay: number) {
        super();
        this.task = task;
        this.delay = delay;
    }

    private tick() {
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

    pause(delay: number) {
        this.alive = false;
        clearTimeout(this.timer);
        setTimeout(() => this.start(), delay);
    }

    stop() {
        this.alive = false;
        clearTimeout(this.timer);
    }

    adjust(delay: number) {
        this.delay = delay;
    }
}

export default Interval;
