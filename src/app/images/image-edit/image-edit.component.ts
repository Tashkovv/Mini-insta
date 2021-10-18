import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Image } from '../Image';
import { ImageService } from '../image.service';

@Component({
  templateUrl: './image-edit.component.html'
})
export class ImageEditComponent implements OnInit, OnDestroy {
  pageTitle = '';
  errorMessage = '';
  imageForm!: FormGroup;

  image!: Image;
  private sub!: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      albumId: [''],
      title: [''],
      url: [''],
      thumbnailUrl: ['']
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getImage(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getImage(id: number): void {
    this.imageService.getImage(id)
      .subscribe({
        next: image => this.displayImage(image),
        error: err => this.errorMessage = err
      });
  }

  displayImage(image: Image): void {
    if (this.imageForm) {
      this.imageForm.reset();
    }

    this.image = image;

    if (this.image.id === 0) {
      this.pageTitle = 'Add Image';
    } else {
      this.pageTitle = 'Edit Image';
    }

    this.imageForm.patchValue({
      albumId: this.image.albumId,
      title: this.image.title,
      url: this.image.url,
      thumbnailUrl: this.image.thumbnailUrl
    });
  }

  saveImage(): void {
    if (this.imageForm.dirty) {
      const i = { ...this.image, ...this.imageForm.value };

      if (i.id === 0) {
        this.imageService.createImage(i)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      } else {
        this.imageService.updateImage(i)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    } else {
      this.imageForm.reset();
      this.router.navigate(['/images']);
    }
  }

  onSaveComplete(): void {
    this.imageForm.reset();
    if (this.image.id === 0)
      alert("The image was added successfully!");
    else alert("The image was edited successfully!");
    this.router.navigate(['/images']);
  }

}
