import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from '../../core/interfaces/productos';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [TarjetaProductoComponent,CommonModule,RouterModule],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss'
})
export class RubroComponent {
  headerService=inject(HeaderService);
  productosService=inject(ProductosService);
  categoriasService=inject(CategoriasService);
  ac=inject(ActivatedRoute);
  productos:Producto[]=[]

ngOnInit(): void {
this.ac.params.subscribe(res=>{
if(res['id']){
  this.categoriasService.getById(parseInt(res['id']))
  .then(categoria=>{
    if(categoria){
      this.productos=categoria.productos;
      this.headerService.titulo.set(categoria.nombre);
    }}) 
}
})

}

}