import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Image } from './Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesUrl = 'http://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.imagesUrl);
  }

  getImage(id: number): Observable<Image> {
    if (id === 0) {
      return of(this.initializeImage());
    }
    const url = `${this.imagesUrl}/${id}`;
    return this.http.get<Image>(url);
  }

  createImage(image: Image): Observable<Image> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    image.id = null;
    return this.http.post<Image>(this.imagesUrl, image, { headers });
  }

  updateImage(image: Image): Observable<Image> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.imagesUrl}/${image.id}`;
    return this.http.put<Image>(url, image, { headers });
  }

  deleteImage(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.imagesUrl}/${id}`;
    return this.http.delete<Image>(url, { headers });
  }

  private initializeImage(): Image {
    return {
      albumId: 0,
      id: 0,
      title: '',
      url: '',
      thumbnailUrl: ''
    };
  }
}
