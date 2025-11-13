import { Component, effect, inject, OnInit } from '@angular/core';

import { VeronaPostService } from '../../../../verona/src/lib/player/verona-post.service';
import { UnitService } from '../../services/unit.service';
import { ResponseService } from '../../services/response.service';

@Component({
  selector: 'widget-starter',
  templateUrl: 'widget-starter.component.html',
  styleUrl: 'widget-starter.component.scss'
})

export class WidgetStarterComponent implements OnInit {
  veronaPostService = inject(VeronaPostService);
  unitService = inject(UnitService);
  responseService = inject(ResponseService);

  parameterKeys:string[] = [];

  constructor() {
    effect(() => {
      this.parameterKeys = Object.keys(this.unitService.parameters());
      console.log('parameter changed', this.unitService.parameters());
      console.log('parameterKeys' , this.parameterKeys);
    });
  }

  ngOnInit() {
    this.responseService.setPresentationStatus('complete');
  }

  openWidget() {
    if (this.unitService.callId === '') {
      this.unitService.callId = Math.floor(Math.random() * 20000000 + 10000000).toString();
    }
    const widgetCall = {
      callId: this.unitService.callId,
      widgetType: this.unitService.widgetType(),
      parameters: this.unitService.getPlainParameters(),
      sharedParameters: this.unitService.getPlainSharedParameters()
    };
    console.log('sending VopWidgetCall', widgetCall);
    this.veronaPostService.sendVopWidgetCall(widgetCall);
  }

  changeParameter(event) {
    this.unitService.setParameter(event.target.id, event.target.value);
  }
}
