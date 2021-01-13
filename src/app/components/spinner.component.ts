import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div
      style="
        z-index: 1; 
        display: flex;
        position: fixed;  
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, .5); 
      "
      *ngIf="loading"
    >
      <div
        style="
        position: absolute;
          display: relative;
          top: 40%;
          left: 40%;
        "
      >
        <mat-spinner color="warn"></mat-spinner>
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input() loading: boolean;
}
