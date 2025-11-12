import { Component, inject, OnInit, signal } from '@angular/core';

import { VeronaPostService } from '../../verona/src/lib/player/verona-post.service';
import { VeronaSubscriptionService } from '../../verona/src/lib/player/verona-subscription.service';

import { MetadataService } from './services/metadata.service';
import { UnitService } from './services/unit.service';
import { StandaloneMenuComponent } from './components/standalone-menu/standalone-menu.component';
import { WidgetStarterComponent } from './components/widget-starter/widget-starter.component';

@Component({
  selector: 'app-root',
  imports: [StandaloneMenuComponent, WidgetStarterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected readonly title = signal('verona-player-dummy');
  isStandalone = false;

  veronaPostService = inject(VeronaPostService);
  veronaSubscriptionService = inject(VeronaSubscriptionService);
  metaDataService = inject(MetadataService);
  unitService = inject(UnitService);

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
      })
    this.isStandalone = window === window.parent;
    console.log('sending VopReadyNotification', this.metaDataService.playerMetadata);
    this.veronaPostService.sendVopReadyNotification(this.metaDataService.playerMetadata);
  }
}
