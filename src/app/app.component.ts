import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, interval, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled && environment.production) {
      this.swUpdate.versionUpdates.subscribe((evt) => {
        switch (evt.type) {
          case 'VERSION_READY':
            this.swUpdate.activateUpdate().then(() => {
              document.location.reload();
            });
            break;
        }
      });
    }

    // if (updates.isEnabled) {
    //   interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate()
    //     .then(() => console.log('checking for updates')));
    // }
  }

  // public checkForUpdates(): void {
  //   this.updates.versionUpdates.subscribe(() => this.promptUser());
  // }

  // private promptUser(): void {
  //   console.log('updating to new version');

  //   this.updates.activateUpdate().then(() => {
  //     alert('here!');
  //     document.location.reload();
  //   });
  // }
}
