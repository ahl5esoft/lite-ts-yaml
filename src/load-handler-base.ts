import { LoadConfigHandleOption } from './load-handle-option';

export abstract class LoadConfigHandlerBase {
    protected next: LoadConfigHandlerBase;

    public setNext(v: LoadConfigHandlerBase) {
        this.next = v;
        return this.next;
    }

    public abstract handle(opt: LoadConfigHandleOption): Promise<void>;
}