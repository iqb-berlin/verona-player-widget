import { Component, inject, OnInit } from '@angular/core';

import { VeronaPostService } from '../../../../verona/src/lib/player/verona-post.service';
import { UnitService } from '../../services/unit.service';
import { ResponseService } from '../../services/response.service';
import { WidgetType } from '../../../../verona/src/lib/verona.interfaces';

@Component({
  selector: 'widget-starter',
  templateUrl: 'widget-starter.component.html',
  styleUrl: 'widget-starter.component.scss'
})

export class WidgetStarterComponent implements OnInit {
  veronaPostService = inject(VeronaPostService);
  unitService = inject(UnitService);
  responseService = inject(ResponseService);

  ngOnInit() {
    this.responseService.setPresentationStatus('complete');
  }

  openWidget() {
    if (this.unitService.callId === '') {
      this.unitService.callId = Math.floor(Math.random() * 20000000 + 10000000).toString();
    }
    const widgetCall = {
      callId: this.unitService.callId,
      parameters: {
        MODE: 'SIMPLE',
        JOURNAL_LINES: '0',
      },
      widgetType: 'WIDGET_CALC' as WidgetType
    };
    console.log('sending VopWidgetCall', widgetCall);
    this.veronaPostService.sendVopWidgetCall(widgetCall);
  }
}
