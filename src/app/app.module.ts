import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaLaboralComponent } from './componentes/experiencia-laboral/experiencia-laboral.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { BarraNavComponent } from './componentes/barra-nav/barra-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaLaboralComponent,
    EducacionComponent,
    HabilidadesComponent,
    PiePaginaComponent,
    BarraNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
