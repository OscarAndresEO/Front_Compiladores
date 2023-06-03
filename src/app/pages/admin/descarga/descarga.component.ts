import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.component.html',
  styleUrls: ['./descarga.component.css'],
})
export class DescargaComponent implements OnInit {
  documentos: any;
  documentoVer!: Blob;
  searchForm: FormGroup;
  constructor(private documentoServicio: DocumentoService) {
    this.searchForm = new FormGroup({
      fechaDesde: new FormControl('', Validators.required),
      fechaHasta: new FormControl('', Validators.required),
      propietario: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  bucarDocumento() {
    if (this.searchForm) {
      let propietario = this.searchForm.get('propietario').value;
      let fechaDesde = this.formatDate(
        new Date(this.searchForm.get('fechaDesde').value)
      );
      let fechaHasta = this.formatDate(
        new Date(this.searchForm.get('fechaHasta').value)
      );
    
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  prwviewDoc(id?: string, nombre?: string) {
    if (id && nombre) {
      
    }
  }

  abrirPDF(urlDoc: any) {
    let newWindow = window.open('', '', 'width=800,height=600');

    if (!newWindow) {
      console.warn('Permitir que el navegador abra ventanas externas.');
      return;
    } else {
      newWindow.document.write(`
      <head><title>Previsualización de documentos</title></head>
      <body>
        <embed src="${urlDoc}#toolbar=1&navpanes=1&scrollbar=1" style="width:100%;height:100%;"/>
      </body>`);
    }
  }
}
