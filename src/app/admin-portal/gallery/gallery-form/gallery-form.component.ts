import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { apiURL } from '../../config';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'b-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  accept = '*';
  files: File[] = [];
  progress: number;
  hasBaseDropZoneOver = false;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<{}>;
  lastFileAt: Date;
  maxSize: 2048;

  sendableFormData: FormData;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
  }

  cancel() {
    this.progress = 0;
    if (this.httpEmitter) {
      console.log('cancelled');
      this.httpEmitter.unsubscribe();
    }
  }

  uploadFiles(files: File[]): Subscription {
    this.httpEmitter = this.galleryService.upload(this.sendableFormData)
      .subscribe((event: HttpEvent<{}>) => {
        this.httpEvent = event;
        console.log(this.httpEvent);
        if (event instanceof HttpResponse) {
          delete this.httpEmitter;
        }
      });
    console.log(this.httpEmitter);
    return this.httpEmitter;
  }

  getDate() {
    return new Date();
  }

}
