import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';

const materialComponents = [MatSidenavModule];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
})
export class MaterialModule {}
