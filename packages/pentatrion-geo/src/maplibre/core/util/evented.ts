import { extend } from "./util";

/**
 * The event class
 */
export class Event {
  readonly type: string;

  constructor(type: string, data: any = {}) {
    extend(this, data);
    this.type = type;
  }
}
