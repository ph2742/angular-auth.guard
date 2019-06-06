import { Component } from "@angular/core";
import { ToasterConfig } from 'angular2-toaster';

@Component({
  template: `
        <router-outlet>
            <toaster-container [toasterconfig]="configToster"></toaster-container>
        </router-outlet>

        <ng4-loading-spinner> </ng4-loading-spinner>
    `
})
export class NoticiaComponent {
  public configToster: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade',
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 2000,
  });
}
