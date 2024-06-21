import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sale } from '../../../models/Sale';
import { SaleService } from '../../../services/sale.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listarsale',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink,NgIf],
  templateUrl: './listarsale.component.html',
  styleUrl: './listarsale.component.css'
})
export class ListarsaleComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource();
  role: string = '';
  constructor(private sS: SaleService, private lS:LoginService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    if (this.isAdmin() || this.isExperto()) {
      this.displayedColumns.push('c6', 'c7');
    }
  }
  eliminar(id: number) {
    this.sS.eliminar(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }
  isExperto() {
    return this.role === 'EXPERTO';
  }
  isCliente() {
    return this.role === 'CLIENTE';
  }

}
