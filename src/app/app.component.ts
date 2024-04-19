import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, interval, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConfig } from '@capacitor-community/mdm-appconfig';
import { ModalController, Platform } from '@ionic/angular';

export const MDM_BASE_URL_KEY = "baseUrl";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isWeb = false;

  constructor(
    private swUpdate: SwUpdate,
    private platform: Platform,
    public modalCtrl: ModalController,
  ) {
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

    this.initializeApp();
  }

  async initializeAppConfigs() {
    try {
      const result = await AppConfig.getValue({
        key: MDM_BASE_URL_KEY,
      });
      console.log('result :>> ', result);
    } catch (e) {
      console.warn(e);
    }
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.isWeb = !this.platform.is('ios') && !this.platform.is('android');

      // for mobile, we need to get the app config from the MDM
      await this.initializeAppConfigs();
    });
  }
}
