import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  environment = environment;

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

}
