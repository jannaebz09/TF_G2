import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OptionPay } from '../../../models/OptionPay';
import { OptionPayService } from '../../../services/optionpay.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listaroptionpay',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatPaginator, RouterLink, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './listaroptionpay.component.html',
  styleUrl: './listaroptionpay.component.css'
})
export class ListaroptionpayComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5'];
  dataSource: MatTableDataSource<OptionPay> = new MatTableDataSource();
  constructor(private oS: OptionPayService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

    });
    this.oS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id: number) {
    this.oS.eliminar(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
      });
    });
  }
}
