import { Component, inject, OnInit } from '@angular/core';

import { VeronaPostService } from '../../verona/src/lib/player/verona-post.service';
import { VeronaSubscriptionService } from '../../verona/src/lib/player/verona-subscription.service';

import { MetadataService } from './services/metadata.service';
import { UnitService } from './services/unit.service';
import { StandaloneMenuComponent } from './components/standalone-menu/standalone-menu.component';
import { WidgetStarterComponent } from './components/widget-starter/widget-starter.component';
import { ResponseService } from './services/response.service';

@Component({
  selector: 'app-root',
  imports: [StandaloneMenuComponent, WidgetStarterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  isStandalone = false;

  veronaPostService = inject(VeronaPostService);
  veronaSubscriptionService = inject(VeronaSubscriptionService);
  metaDataService = inject(MetadataService);
  unitService = inject(UnitService);
  responseService = inject(ResponseService);

  ngOnInit() {
    this.veronaSubscriptionService.vopStartCommand
      .subscribe(vopStartCommand => {
        console.log('received vopStartCommand', vopStartCommand);
        this.veronaPostService.sessionID = vopStartCommand.sessionId;
        if (vopStartCommand.unitDefinition) {
          const unitDefinition = JSON.parse(vopStartCommand.unitDefinition);
          this.unitService.setNewData(unitDefinition);
        }
      });
    this.veronaSubscriptionService.vopWidgetReturn
      .subscribe(vopWidgetReturn => {
        console.log('received vopWidgetReturn', vopWidgetReturn);
        if (vopWidgetReturn.callId === this.unitService.callId) {
          this.responseService.setState(vopWidgetReturn.state);
          this.responseService.setResponseStatus('complete');
          const unitState = {
            dataParts: {
              response: JSON.stringify(this.responseService.getResponses())
            },
            responseProgress: this.responseService.responseStatus(),
            presentationProgress: this.responseService.presentationStatus()
          };
          console.log('sending VopStateChangedNotification', unitState);
          this.veronaPostService.sendVopStateChangedNotification({
            unitState: unitState
          })
        }
      })
    this.isStandalone = window === window.parent;
    console.log('sending VopReadyNotification', this.metaDataService.playerMetadata);
    this.veronaPostService.sendVopReadyNotification(this.metaDataService.playerMetadata);
  }

  continue() {
    console.log('sending VopUnitNavigationRequestedNotification', 'next');
    this.veronaPostService.sendVopUnitNavigationRequestedNotification('next')
  }
}
