import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    create(task: TaskDto){
        this.tasks.push(task);
        return task;
    }

    findById(id: string){
        const foundTask = this.tasks.find(task => task.id === id);
        
        if(foundTask){
            return foundTask;
        }
        
        throw new HttpException(`Task with id = ${id} not found`, HttpStatus.NOT_FOUND);
    }

    update(task: TaskDto){
        let taskIndex = this.tasks.findIndex(task => task.id === task.id);

        if(taskIndex === -1){
            throw new HttpException(`Task with id = ${task.id} not found`, HttpStatus.BAD_REQUEST);
        }

        this.tasks[taskIndex] = task;

        return this.tasks[taskIndex];

    }

}
