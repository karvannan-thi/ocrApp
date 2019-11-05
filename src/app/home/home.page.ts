import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Plugins, CameraResultType } from '@capacitor/core';
import { NavigationExtras } from '@angular/router';

const { Camera } = Plugins;
const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 50,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'rear',
  toBack: true,
  alpha: 1
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  interval: any;
  ids: string ="";
  constructor(private ocr: OCR, private router: NavController, public toastController: ToastController, private cameraPreview: CameraPreview) {}

  async handleFileInput() {
    // start camera
    await this.cameraPreview.startCamera(cameraPreviewOpts);
    const that = this;
    this.interval = setInterval(async function() {
      try {
        let image = await that.cameraPreview.takeSnapshot(that.pictureOpts);
        console.log('test');
        let res: OCRResult = await that.ocr.recText(OCRSourceType.BASE64, image);
        if(res.foundText) {
          let lines = res.lines.linetext;
          this.presentToast(lines);
        } 
      }catch(e) {
          
      }
    },500);
  }
  clear() {
    clearInterval(this.interval);
    this.cameraPreview.stopCamera();
  }

  async presentToast(id) {
    clearInterval(this.interval);
    this.cameraPreview.stopCamera();
    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: JSON.stringify(id),
      }
    };
    this.router.navigateForward(['/people'], navigationExtras)
  }
    
}
