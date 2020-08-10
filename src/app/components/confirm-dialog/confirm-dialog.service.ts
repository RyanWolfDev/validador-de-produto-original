import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ConfirmDialogService {
  private subject = new Subject<any>();

  constructor() {}

  confirmThis(message: string, yesFn: () => void, noFn: () => void) {
    this.setConfirmation(message, yesFn, noFn);
  }

  setConfirmation(message: string, yesFn: () => void, noFn: () => void) {
    let that = this;
    this.subject.next({
      type: "confirm",
      text: message,
      yesFn: function () {
        that.subject.next();
        yesFn();
      },
      noFn: function () {
        that.subject.next();
        noFn();
      },
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
