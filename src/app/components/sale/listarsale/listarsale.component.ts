import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sale } from '../../../models/Sale';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-listarsale',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './listarsale.component.html',
  styleUrl: './listarsale.component.css'
})
export class ListarsaleComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource();
  constructor(private rS: SaleService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
