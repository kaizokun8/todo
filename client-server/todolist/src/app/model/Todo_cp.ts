import {Priority} from "./priority";

export class Todo {

  private _id: number;
  private _title: string;
  private _description: string;
  private _priority: Priority;
  private _creationTime: number;
  private _updateTime: number;
  private _scheduled: boolean;
  private _startTime: number;
  private _endTime: number;
  private _done: boolean;

  constructor(id: number,
              title: string,
              description: string,
              priority: Priority,
              creationTime: number,
              updateTime: number,
              scheduled: boolean,
              startTime: number,
              endTime: number,
              done: boolean) {

    this._id = id;
    this._title = title;
    this._description = description;
    this._priority = priority;
    this._creationTime = creationTime;
    this._updateTime = updateTime;
    this._scheduled = scheduled;
    this._startTime = startTime;
    this._endTime = endTime;
    this._done = done;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get priority(): Priority {
    return this._priority;
  }

  set priority(value: Priority) {
    this._priority = value;
  }

  get creationTime(): number {
    return this._creationTime;
  }

  get creationDate(): Date | null {
    return this._creationTime ? new Date(this._creationTime) : null;
  }

  set creationTime(value: number) {
    this._creationTime = value;
  }

  get updateTime(): number {
    return this._updateTime;
  }

  get updateDate(): Date | null {
    return this._updateTime ? new Date(this._updateTime) : null;
  }

  set updateTime(value: number) {
    this._updateTime = value;
  }

  get scheduled(): boolean {
    return this._scheduled;
  }

  set scheduled(value: boolean) {
    this._scheduled = value;
  }

  get startTime(): number {
    return this._startTime;
  }

  get startDate(): Date | null {
    return this._startTime ? new Date(this._startTime) : null;
  }

  set startTime(value: number) {
    this._startTime = value;
  }

  get endTime(): number {
    return this._endTime;
  }

  get endDate(): Date | null {
    return this._endTime ? new Date(this._endTime) : null;
  }

  set endTime(value: number) {
    this._endTime = value;
  }

  get done(): boolean {
    return this._done;
  }

  set done(value: boolean) {
    this._done = value;
  }
}
