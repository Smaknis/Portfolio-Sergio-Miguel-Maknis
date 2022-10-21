import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRecarga]'
})
export class RecargaDirective implements OnChanges{

  @Input() appRecarga !: any;

  constructor( 
              private templateRef: TemplateRef<any>, 
              private viewContainerRef: ViewContainerRef ) 
      {  
        this.viewContainerRef.createEmbeddedView(templateRef);
      }

  ngOnChanges( changes: SimpleChanges ): void {
    if( changes [ 'appRecarga' ] ) 
    { //destruye y recarga componente
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView( this.templateRef);
    }
  }

}
