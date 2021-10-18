import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageEditComponent } from './image-edit/image-edit.component';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    ImagesComponent,
    ImageDetailsComponent,
    ImageEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'images',
        component: ImagesComponent
      },
      {
        path: 'images/:id',
        component: ImageDetailsComponent
      },
      {
        path: 'images/:id/edit',
        component: ImageEditComponent
      }
    ])
  ]
})
export class ImagesModule { }
