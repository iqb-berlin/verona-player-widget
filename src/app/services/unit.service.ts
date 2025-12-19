import { Injectable, signal } from '@angular/core';

import { UnitDefinition } from '../models/unit-definition';
import { SharedParameter, WidgetParameter, WidgetType } from '../../../verona/src/lib/verona.interfaces';

@Injectable({
  providedIn: 'root'
})

export class UnitService {
  callId = '';

  private _title = signal('Verona Player Widget');
  title = this._title.asReadonly();
  private _description = signal('');
  description = this._description.asReadonly();

  private _continueButton = signal('ALWAYS');
  continueButton = this._continueButton.asReadonly();
  private _backgroundColor = signal('ALWAYS');
  backgroundColor = this._backgroundColor.asReadonly();

  private _widgetType = signal<WidgetType | undefined>(undefined);
  widgetType = this._widgetType.asReadonly();
  private _parameters = signal<Record<string, any>>({});
  parameters = this._parameters.asReadonly();
  private _sharedParameters = signal<Record<string, any>[]>([]);
  sharedParameters = this._sharedParameters.asReadonly();


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
    this._widgetType.set(def.widgetType as WidgetType);
    this._parameters.set(def.parameters);
    this._sharedParameters.set(def.sharedParameters);
    this._title.set(def.title);
    this._description.set(def.description || '');
  }

  getPlainParameters(): WidgetParameter[] {
    let parameters: WidgetParameter[] = new Array<WidgetParameter>();
    Object.keys(this.parameters()).forEach(key => {
      const newParameter = {
        key: key,
        value: this.parameters()[key]?.defaultValue || ''
      }
      parameters.push(newParameter);
    });
    return parameters;
  }

  getSharedParameters(): SharedParameter[] {
    let sharedParameters: SharedParameter[] = new Array<SharedParameter>();
    Object.keys(this.sharedParameters()).forEach(key => {
      const newParameter = {
        key: key,
        value: this.sharedParameters()[key]?.defaultValue || ''
      }
      sharedParameters.push(newParameter);
    });
    return sharedParameters;
  }

  setParameter(key: string, value:string) {
    let parameters = this.parameters();
    if (parameters[key]) {
      parameters[key].defaultValue = value;
    }
    this._parameters.set(parameters);
  }
}
