import {Priority} from "../model/Priority";

export class TodoFilters {

  priority: Array<Priority> | null = null;
  title: string | null = null;
  description: string | null = null;
  done: boolean | null = null;
  startTime: number | null = null;
  endTime: number | null = null;
  scheduled: boolean | null = null;
  startCreationTime: number | null = null;
  endCreationTime: number | null = null;
  page: number | null = null;
  pageSize: number | null = null;
}
