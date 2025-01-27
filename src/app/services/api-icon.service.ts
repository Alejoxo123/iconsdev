import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiIconService {
  // Actualiza la URL a la ruta de tu backend desplegado en Netlify
  private apiUrl = 'https://backeniconsdev.netlify.app/.netlify/functions'; 
  private apiKey = 'FjcMdgIarIhctsQHgLt2hxlqE4YGRct6aNKQx2sDyEdNoPuYXtDiRD3Cw4I0WUxg'; 

  constructor(private http: HttpClient) { }

  // Método para obtener los iconos
  getIconos(query: string = '', count: number = 10, offset: number = 0): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
    const params = new HttpParams()
      .set('query', query)
      .set('count', count.toString())
      .set('offset', offset.toString());

    // Cambia la ruta de la API para que apunte a Netlify
    return this.http.get<any>(`${this.apiUrl}/icons`, { headers, params }).pipe(
      catchError(error => {
        console.error('Error al obtener los iconos:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  // Método para descargar un icono
  downloadIcon(iconId: string, size: number): Observable<Blob> {
    const params = new HttpParams()
      .set('iconId', iconId)
      .set('size', size.toString());

    // Cambia la ruta de la API para que apunte a Netlify
    return this.http.get(`${this.apiUrl}/download-icon`, {
      params,
      responseType: 'blob'  // Especifica que la respuesta será un Blob (para archivos)
    }).pipe(
      catchError(error => {
        console.error('Error al descargar el icono:', error);
        return of(new Blob([])); // Retorna un Blob vacío en caso de error
      })
    );
  }
}
