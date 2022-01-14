import {Priority} from "../model/priority";

export class TodoFilters {

  public title: string | null = null;
  public description: string | null = null;
  public priority: Array<Priority> = [];
  public startCreationTime: number | null = null;
  public endCreationTime: number | null = null;
  public startTime: number | null = null;
  public endTime: number | null = null;
  public scheduled: boolean = false;
  public done: boolean | null = null;
  public page: number | null = null;
  public pageSize: number | null = null;

  constructor() {
  }

}
