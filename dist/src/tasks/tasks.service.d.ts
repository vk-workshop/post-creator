import { Repository } from 'typeorm';
import { Task } from './task.entity';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    findAll(filter?: string): Promise<Task[]>;
    create(task: Partial<Task>): Promise<Task>;
    update(id: number, task: Partial<Task>): Promise<Task>;
    remove(id: number): Promise<void>;
}
