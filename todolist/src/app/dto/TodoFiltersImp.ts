import {TodoFilters} from "./TodoFilters";
import {Priority} from "../model/priority";

export class TodoFiltersImp implements TodoFilters{

  description: string | null = null;
  done: boolean | null = null;
  endCreationTime: number | null = null;
  endTime: number | null = null;
  page: number | null = null;
  pageSize: number | null = null;
  priority: Array<Priority> | null= null;
  scheduled: boolean| null = null;
  startCreationTime: number | null = null;
  startTime: number | null= null;
  title: string | null= null;

}
