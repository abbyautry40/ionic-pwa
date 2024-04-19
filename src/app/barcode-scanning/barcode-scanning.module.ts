import { NgModule } from '@angular/core';

import { BarcodeScanningRoutingModule } from './barcode-scanning-routing.module';


import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanningPage } from './barcode-scanning.page';
import { SharedModule } from '../shared';

@NgModule({
  imports: [BarcodeScanningRoutingModule, SharedModule],
  declarations: [BarcodeScanningPage, BarcodeScanningModalComponent],
})
export class BarcodeScanningModule {}
