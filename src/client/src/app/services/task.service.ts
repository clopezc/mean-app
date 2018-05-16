import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';



import {Task} from '../Task';

@Injectable()
export class TaskService {
domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getTask(): Observable<Task[]>{
    return this.http.get<Task[]>(this.domain+'/tasks');
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.domain}/tasks`, newTask)      
  }

  deleteTask(id){
    return this.http.delete<Task>(`${this.domain}/tasks/${id}`)
  }

  updateTask(newTask) {
    return this.http.put<Task>(`${this.domain}/tasks/${newTask._id}`, newTask)
  }

}
