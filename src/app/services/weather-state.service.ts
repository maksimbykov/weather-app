import { Injectable } from '@angular/core';
import { createMachine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';

@Injectable({
  providedIn: 'root',
})
export class WeatherStateService {
  private weatherMachine = createMachine({
    id: 'weather',
    initial: 'loading',
    states: {
      loading: {
        on: {
          LOADED: 'loaded',
        },
      },
      loaded: {
        on: {
          SELECT_DAY: 'selected',
        },
      },
      selected: {
        // on: {
        //   BACK: 'loaded',
        // },
        always: 'loaded'
      },
    },
  });

  private service = interpret(this.weatherMachine).start();

  send(event: string): void {
    this.service.send(event);
  }

  onTransition(callback: (state: any) => void): void {
    this.service.onTransition(callback);
  }

  getState(): any {
    return this.service.getSnapshot().value;
  }
}
