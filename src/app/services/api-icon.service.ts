import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiIconService {
  private apiUrl = 'http://localhost:3000'; 
  private apiKey = 'FjcMdgIarIhctsQHgLt2hxlqE4YGRct6aNKQx2sDyEdNoPuYXtDiRD3Cw4I0WUxg'; 

  constructor(private http: HttpClient) { }

  
  getIconos(query: string = '', count: number = 10, offset: number = 0): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
    const params = new HttpParams()
      .set('query', query)
      .set('count', count.toString())
      .set('offset', offset.toString());

    return this.http.get<any>(`${this.apiUrl}/icons`, { headers, params }).pipe(
      catchError(error => {
        console.error('Error al obtener los iconos:', error);
        return of([]);
      })
    );
  }

  
  downloadIcon(iconId: string, size: number): Observable<Blob> {
    const params = new HttpParams()
      .set('iconId', iconId)
      .set('size', size.toString());

    return this.http.get(`${this.apiUrl}/download-icon`, {
      params,
      responseType: 'blob'  
    }).pipe(
      catchError(error => {
        console.error('Error al descargar el icono:', error);
        return of(new Blob([])); 
      })
    );
  }
}
