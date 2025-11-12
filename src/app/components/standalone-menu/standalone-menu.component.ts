import { Component } from '@angular/core';
import {
  CdkMenu, CdkMenuBar, CdkMenuItem, CdkMenuTrigger
} from '@angular/cdk/menu';

import { FileService } from '../../services/file.service';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'standalone-menu',
  standalone: true,
  imports: [
    CdkMenuTrigger,
    CdkMenuItem,
    CdkMenuBar,
    CdkMenu
  ],
  templateUrl: 'standalone-menu.component.html',
  styleUrl: 'standalone-menu.component.scss'
})

export class StandaloneMenuComponent {
  constructor(
    public unitService: UnitService
  ) { }

  async load(): Promise<void> {
    await FileService.loadFile(['.json', '.voud']).then(fileObject => {
      const unitDefinition = JSON.parse(fileObject.content);
      this.unitService.setNewData(unitDefinition);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleDummy() {
    alert('Dummy');
  }
}
