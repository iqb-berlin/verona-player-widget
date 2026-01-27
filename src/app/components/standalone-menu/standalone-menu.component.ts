import { Component, inject } from '@angular/core';
import {
  CdkMenu, CdkMenuBar, CdkMenuItem, CdkMenuTrigger
} from '@angular/cdk/menu';
import { Dialog } from '@angular/cdk/dialog';

import { FileService } from '../../services/file.service';
import { UnitService } from '../../services/unit.service';
import { EditDialog } from './edit-dialog.component';

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
  dialog = inject(Dialog);
  unitService = inject(UnitService);

  unitDefinitionAsString = '';

  async load(): Promise<void> {
    await FileService.loadFile(['.json', '.voud']).then(fileObject => {
      this.unitDefinitionAsString = fileObject.content;
      const unitDefinition = JSON.parse(this.unitDefinitionAsString);
      this.unitService.setNewData(unitDefinition);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  openEdit() {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '800px',
      height: '600px',
      data: this.unitDefinitionAsString
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.unitDefinitionAsString = result as string;
        const unitDefinition = JSON.parse(this.unitDefinitionAsString);
        this.unitService.setNewData(unitDefinition);
      }
    });
  }
}
