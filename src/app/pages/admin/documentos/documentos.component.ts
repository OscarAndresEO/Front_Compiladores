import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { documento } from 'src/app/interfaces/interfaces';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  agregarForm: FormGroup;
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventoColumns: string[] = [
    'regionPatencion',
    'dpiUsuario',
    'nombreUsuarioAtencion',
    'codigoCargo',
    'accion',
  ];

  constructor(private documentoServicio: DocumentoService) {
    this.agregarForm = new FormGroup({
      textoJava: new FormControl(''),
    });

    this.selectedFiles = [];
  }
  archi: any;

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  selectedFiles: any[];

  guardar() {
    const formData = new FormData();
    if (
      this.agregarForm.get('textoJava').value !== null &&
      this.selectedFiles.length > 0
    ){
      Swal.fire({
        title: 'Debe de enviar solo una opcion',
        text: '',
        icon: 'error',
      });
    }else{
      
      
      if (this.agregarForm.get('textoJava').value !== null) {
        console.log(this.agregarForm.get('textoJava').value);

        formData.append('textoJava', this.agregarForm.get('textoJava').value);

        console.log(this.formDataToJSON(formData));
        this.documentoServicio.enviarTexto(formData).subscribe(
          (response) => {
            console.log('Se hizo la solicitud correctamente');

            console.log(response);
            this.selectedFiles = null;
            this.agregarForm.reset();
          },
          (error) => {
            console.error('Error al enviar el texto:', error);
          }
        );
      } else {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('file', this.selectedFiles[i]);
        }

        this.documentoServicio.enviarDocumento(formData).subscribe(
          (response) => {
            Swal.fire({
              title: 'El archivo fue enviado correctamente.',
              text: '',
              icon: 'success',
            });
            this.selectedFiles = null;
            this.agregarForm.reset();
          },
          (error) => {
            console.error('Error al guardar el documento:', error);
          }
        );
      }
    }
  }

  formDataToJSON(formData) {
    const json = {};
    for (const [key, value] of formData.entries()) {
      json[key] = value;
    }
    return JSON.stringify(json);
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  getFileName(file: File): string {
    return file.name;
  }

  limpiar() {
    this.selectedFiles = null;
    this.agregarForm.reset();
  }
}
