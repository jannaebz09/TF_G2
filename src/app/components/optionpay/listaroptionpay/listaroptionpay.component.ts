import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OptionPay } from '../../../models/OptionPay';
import { OptionPayService } from '../../../services/optionpay.service';
@Component({
  selector: 'app-listaroptionpay',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatPaginator],
  templateUrl: './listaroptionpay.component.html',
  styleUrl: './listaroptionpay.component.css'
})
export class ListaroptionpayComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['id', 'tipo', 'descripcion'];
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
}
