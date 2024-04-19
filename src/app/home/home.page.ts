import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  environment = environment;

  public plugins = [
    {
      name: 'Barcode Scanning',
      url: '/barcode-scanning',
    }
  ];

  get type() {
    return Capacitor.getPlatform();
  }

  constructor(public photoService: PhotoService) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async openBrowser() {
    await Browser.open({ url: 'http://capacitorjs.com/' });
  }

}
