import { Injectable, signal } from '@angular/core';
import { Progress } from '../../../verona/src/lib/verona.interfaces';

@Injectable({
  providedIn: 'root'
})

export class ResponseService {
  private _presentationStatus = signal<Progress>('none');
  presentationStatus = this._presentationStatus.asReadonly();
  private _responseStatus = signal<Progress>('none');
  responseStatus = this._responseStatus.asReadonly();
  private _state = signal('');
  state = this._state.asReadonly();
  private _stateAsImage = signal('');
  stateAsImage = this._stateAsImage.asReadonly();

  setPresentationStatus(v: Progress) {
    this._presentationStatus.set(v);
  }

  setResponseStatus(v: Progress) {
    this._responseStatus.set(v);
  }

  setState(v: string) {
    this._state.set(v);
    let stateAsJson: any;
    try{
      stateAsJson = JSON.parse(v);
    } catch (e) {
    }
    if (stateAsJson?.hasOwnProperty('asImage')) {
      this._stateAsImage.set(stateAsJson.asImage);
    } else {
      this._stateAsImage.set('');
    }
  }

  getResponses() {
    return [
      {
        id: 'state',
        status: 'VALUE_CHANGED',
        value: this._state()
      }
    ]
  }
}
