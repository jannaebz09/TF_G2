import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sale } from '../../../models/Sale';
import { SaleService } from '../../../services/sale.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarsale',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './listarsale.component.html',
  styleUrl: './listarsale.component.css'
})
export class ListarsaleComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7'];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource();
  constructor(private rS: SaleService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
