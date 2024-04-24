import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Observable, filter, fromEvent, interval, map } from 'rxjs';
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
    this.initializeApp();
    this.listenForInternetConnection();
    this.checkForUpdates();
  }


  async checkForUpdates() {
    console.log('checking environment...');
    if (this.swUpdate.isEnabled && !environment.production) {
      return;
    }

    try {
      const newVersion = await this.swUpdate.checkForUpdate();

      if (newVersion) {
        console.log('activating update...');
        await this.swUpdate.activateUpdate();
        document.location.reload();
      }
    } catch(error) {
      console.log('error :>> ', error);
    }
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

  listenForInternetConnection(): void {
		console.log('listening for internet...');

		const online$: Observable<Event> = fromEvent(window, "online");
		const offline$: Observable<Event> = fromEvent(window, "offline");

    online$.subscribe((x) => {
      console.log('online$ :>> ', x);
    })

    offline$.subscribe((x) => {
      console.log('offline$ :>> ', x);
    })

		// StorageService.addSubscription(
		// 	online$.subscribe(() => {
		// 		console.log("BaseService.listenForInternetConnection: Online");
		// 	})
		// );
		// StorageService.addSubscription(
		// 	offline$.subscribe(() => {
		// 		console.log(
		// 			"BaseService.listenForInternetConnection: Offline - Lost internet connection"
		// 		);
		// 	})
		// );
	}

}
