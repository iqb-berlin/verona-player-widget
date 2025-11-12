import { Injectable } from '@angular/core';

import { UnitDefinition } from '../models/unit-definition';

@Injectable({
  providedIn: 'root'
})

export class UnitService {
  callId = '';

  reset() {
    this.callId = '';
  }

  setNewData(unitDefinition: unknown) {
    this.reset();
    const def = unitDefinition as UnitDefinition;
    console.log('new unit definition: ', def);
  }
}
