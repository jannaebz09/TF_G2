import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-listar-product',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatPaginator],
  templateUrl: './listar-product.component.html',
  styleUrl: './listar-product.component.css'
})
export class ListarProductComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['id', 'producto', 'descripcion','preparacion','precio','ruc'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  constructor(private pS: ProductService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

    });
    this.pS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
