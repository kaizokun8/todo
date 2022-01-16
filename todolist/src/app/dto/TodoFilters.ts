import {Priority} from "../model/priority";

export interface TodoFilters {

  title: string | null;
  description: string | null;
  priority: Array<Priority> | null;
  startCreationTime: number | null;
  endCreationTime: number | null;
  startTime: number | null;
  endTime: number | null;
  scheduled: boolean | null;
  done: boolean | null;
  page: number | null;
  pageSize: number | null;
}
