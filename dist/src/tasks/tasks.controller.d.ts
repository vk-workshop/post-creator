import { TasksService } from './tasks.service';
import { Task } from './task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(status: string): Promise<Task[]>;
    create(task: Partial<Task>): Promise<Task>;
    update(id: string, task: Partial<Task>): Promise<Task>;
    remove(id: string): Promise<void>;
}
