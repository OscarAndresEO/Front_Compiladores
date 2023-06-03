import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import baserUrl from './helper';
import { documento } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private http: HttpClient) {}

  enviarDocumento(datos: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data; boundary=<boundary>');
    console.log(this.formDataToJSON(datos));
    return this.http.post(`${baserUrl}/analizador/archivo`, datos, { headers });
  }
  formDataToJSON(formData) {
    const json = {};
    for (const [key, value] of formData.entries()) {
      json[key] = value;
    }
    return JSON.stringify(json);
  }

  enviarTexto(texto: any) {    
    return this.http.post(`${baserUrl}/analizador/texto`, texto);
  }


}
