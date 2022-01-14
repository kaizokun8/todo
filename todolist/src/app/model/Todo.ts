import {Priority} from "./priority";

export class Todo {

  public id: number | null = 0;
  public title: string = "";
  public description: string = "";
  public priority: Priority = Priority.LOW;
  public creationTime: number = 0;
  public updateTime: number = 0;
  public scheduled: boolean = false;
  public startTime: number = 0;
  public endTime: number = 0;
  public done: boolean = false;

  constructor() {

  }

  get creationDate(): Date | null {
    return this.creationTime ? new Date(this.creationTime) : null;
  }

  get updateDate(): Date | null {
    return this.updateTime ? new Date(this.updateTime) : null;
  }

  get startDate(): Date | null {
    return this.startTime ? new Date(this.startTime) : null;
  }

  get endDate(): Date | null {
    return this.endTime ? new Date(this.endTime) : null;
  }

}
