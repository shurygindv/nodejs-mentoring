
import { MaybeNull } from '../types';

// TODO: promisify create/update/delete

class JsonStore<T> {
    private map: Map<string, T>;

    public constructor(jsonString?: string) {
        this.map = new Map();
    }

    private setItem(key: string, item: T): void {
        this.map.set(key, item);
    }

    private deleteItem(key: string): void {
        this.map.delete(key);
    }

    private getItemById (id: string): MaybeNull<T> {
        return this.map.get(id) || null
    }

    private getItems(): T[] {
        return [...this.map.values()];
    }

    private addItem(id: string, item: T): boolean {
        this.setItem(id, item);

        return true;
    }

    private updateItem(key: string, item: T): void {
        this.setItem(key, item);
    }

    public create(id: string, item: T): boolean {
        this.addItem(id, item);

        return true;
    }

    public update(id: string, item: T): string {
        this.updateItem(id, item);

        return id;
    }

    public deleteById(id: string): boolean {
        this.deleteItem(id);

        return true;
    }

    public findAll(): T[] {
        return this.getItems();
    }

    public findById(id: string): MaybeNull<T> {
        return this.getItemById(id) || null;
    }

    public usePartialUpdate (id: string, options: Partial<T>): string {
        const existing = this.getItemById(id)

        if (!existing) {
            return id;
        }
     
        this.update(id, {
            ...existing,
            ...options
        });

        return id;
    }
}

export const createJsonStore = <T>(jsonString?: string): JsonStore<T> =>
    new JsonStore<T>(jsonString);