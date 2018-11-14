import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {

  ticketId: string;
  ticketStorageKey: string;
  images: any[];
  loading: any;
  constructor(private webView: WebView,
    private camera: Camera, private storage: Storage,
    private platform: Platform, private file: File,
    private toastController: ToastController,
    private ref: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute) { }

  ngOnInit() {    
    this.platform.ready().then(()=>{
      this.route.paramMap.subscribe(params => {
        this.ticketId = params.get('id');
        this.ticketStorageKey = STORAGE_KEY+"_"+this.ticketId;
        this.loadStoredImages(this.ticketStorageKey);
      });      
    });
  }

  async loadStoredImages(storageKey: string) {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await this.loading.present();
    this.storage.get(storageKey).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    }).then(()=>{
      this.loading.dismiss()
    });
    
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webView.convertFileSrc(img);
      return converted;
    }
  }

  takeLivePicture(){
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }

  selectPicture(){
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: true,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //The cordova plugin adds a timestamp to the end of the file url
        if (sourceType == this.camera.PictureSourceType.PHOTOLIBRARY){
          currentName = currentName.substr(0, currentName.lastIndexOf('?'));
        }
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });
}

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  startUpload(){
    this.presentToast('This is only a test version...');
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
 
    this.storage.get(this.ticketStorageKey).then(images => {
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != imgEntry.name);
        this.storage.set(this.ticketStorageKey, JSON.stringify(filtered));
 
        var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
 
        this.file.removeFile(correctPath, imgEntry.name).then(res => {
            this.presentToast('File removed.');
        });
    });
}

  createFileName() {
    let d = new Date();
    let n = d.getTime();
    let newFileName = n + ".jpg";
    return newFileName;
}

copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
  }, error => {
      this.presentToast('Error while storing file.');
  });
}

updateStoredImages(name) {
  this.storage.get(this.ticketStorageKey).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
          let newImages = [name];
          this.storage.set(this.ticketStorageKey, JSON.stringify(newImages));
      } else {
          arr.push(name);
          this.storage.set(this.ticketStorageKey, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
  });
}

}
