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
import { AgregarExperienciaComponent } from './componentes/agregar-experiencia/agregar-experiencia.component';
import { FormsModule } from '@angular/forms';
import { BotonComponent } from './componentes/boton/boton.component';
import { ExperienciaItemComponent } from './componentes/experiencia-item/experiencia-item.component';
import { EducacionItemComponent } from './componentes/educacion-item/educacion-item.component';
import { RecargaDirective } from './directives/recarga.directive';
import { HabilidadesItemComponent } from './componentes/habilidades-item/habilidades-item.component';
import { Habilidades1ItemComponent } from './componentes/habilidades1-item/habilidades1-item.component';
import { PiePaginaItemComponent } from './componentes/pie-pagina-item/pie-pagina-item.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaLaboralComponent,
    EducacionComponent,
    HabilidadesComponent,
    PiePaginaComponent,
    BarraNavComponent,
    AgregarExperienciaComponent,
    BotonComponent,
    ExperienciaItemComponent,
    EducacionItemComponent,
    RecargaDirective,
    HabilidadesItemComponent,
    Habilidades1ItemComponent,
    PiePaginaItemComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
