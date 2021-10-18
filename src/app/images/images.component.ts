import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { Image } from './Image';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  errorMessage = '';

  allImages: Image[] = [];
  images: Image[] = [];

  page = 1;
  pageSize = 44;
  count = 0;

  constructor(private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(
        images => {
          this.images = images;
          this.count = images.length;
        },
        error => {
          this.errorMessage = error
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getImages();
  }

  truncateTitle(image: Image): String {
    if (image.title.length > 44)
      return image.title.substring(0, 44) + "...";
    else return image.title;
  }

}

