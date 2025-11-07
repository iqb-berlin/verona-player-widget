import { Component, inject } from '@angular/core';

import { VeronaPostService } from '../../../../verona/src/lib/player/verona-post.service';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'widget-starter',
  templateUrl: 'widget-starter.component.html',
  styleUrl: 'widget-starter.component.scss'
})

export class WidgetStarterComponent {
  veronaPostService = inject(VeronaPostService);
  unitService = inject(UnitService);

  openWidget() {
    if (this.unitService.callId === '') {
      this.unitService.callId = Math.floor(Math.random() * 20000000 + 10000000).toString();
    }
    this.veronaPostService.sendVopWidgetCall({
      callId: this.unitService.callId,
      parameters: {
        MODE: 'SIMPLE',
        JOURNAL_LINES: '0',
      },
      widgetType: 'WIDGET_CALC'
    });
  }
}
