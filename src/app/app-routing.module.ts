import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { DocumentosComponent } from './pages/admin/documentos/documentos.component';
import { DescargaComponent } from './pages/admin/descarga/descarga.component';

const routes: Routes = [
  {
    path: '**', redirectTo: 'compilador'
  },
  {
    path: 'compilador',
    component: DocumentosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
