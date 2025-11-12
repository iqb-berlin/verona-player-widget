import { Injectable, signal } from '@angular/core';

import { UnitDefinition } from '../models/unit-definition';
import { WidgetType } from '../../../verona/src/lib/verona.interfaces';

@Injectable({
  providedIn: 'root'
})

export class UnitService {
  callId = '';

  widgetType: WidgetType;
  parameters: Record<string, string> = {};
  sharedParameters: Record<string, string> = {};

  private _continueButton = signal('ALWAYS');
  continueButton = this._continueButton.asReadonly();
  private _backgroundColor = signal('ALWAYS');
  backgroundColor = this._backgroundColor.asReadonly();

  reset() {
    this.callId = '';
  }

  setNewData(unitDefinition: unknown) {
    this.reset();
    const def = unitDefinition as UnitDefinition;
    console.log('new unit definition: ', def);
    if (def.id !== 'widget-unit-definition') return;
    const pattern = /^#([a-f0-9]{3}|[a-f0-9]{6})$/i;
    if (def.backgroundColor && pattern.test(def.backgroundColor)) {
      this._backgroundColor.set(def.backgroundColor);
    }
    if (def.continueButtonShow) {
      this._continueButton.set(def.continueButtonShow);
    }
    this.widgetType = def.widgetType as WidgetType;
    Object.keys(def.parameters).forEach(key => {
      this.parameters[key] = def.parameters[key]?.defaultValue || '';
    });
    Object.keys(def.sharedParameters).forEach(key => {
      this.sharedParameters[key] = def.sharedParameters[key]?.defaultValue || '';
    });
  }
}
