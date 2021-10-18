import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { Image } from '../Image';

@Component({
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  pageTitle = "Image details";
  errorMessage = '';
  image!: Image;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit(): void {
    const param = Number(this.route.snapshot.paramMap.get('id'));
    if (param) {
      const id = +param;
      this.getImage(id);
    }
  }

  getImage(id: number): void {
    this.imageService.getImage(id).subscribe({
      next: image => this.image = image,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/images']);
  }

  deleteImage(): void {
    if (this.image.id) {

      if (confirm('Really delete the image?')) {

        this.imageService.deleteImage(this.image.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onSaveComplete(): void {
    alert("The image was successfully deleted.");
    this.router.navigate(['/images']);
  }
}
