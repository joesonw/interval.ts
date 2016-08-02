/// <reference types="node" />
import { EventEmitter } from 'events';
declare class Interval extends EventEmitter {
    private alive;
    private delay;
    private timer;
    private task;
    constructor(task: () => Promise<void>, delay: number);
    private tick();
    start(): void;
    pause(delay: number): void;
    stop(): void;
    adjust(delay: number): void;
}
export default Interval;
