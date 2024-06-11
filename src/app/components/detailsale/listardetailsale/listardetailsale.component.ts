import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DetailSale } from '../../../models/DetailSale';
import { DetailsaleService } from '../../../services/detailsale.service';

@Component({
  selector: 'app-listardetailsale',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './listardetailsale.component.html',
  styleUrl: './listardetailsale.component.css'
})
export class ListardetailsaleComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7','c8'];
  dataSource: MatTableDataSource<DetailSale> = new MatTableDataSource();
  constructor(private dS: DetailsaleService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.dS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminar(id: number) {
    this.dS.eliminar(id).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
