import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpCertificate } from '../../../models/ExpCertificate';
import { ExpcertificateService } from '../../../services/expcertificate.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listarexpcertificate',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink,NgIf],
  templateUrl: './listarexpcertificate.component.html',
  styleUrl: './listarexpcertificate.component.css'
})
export class ListarexpcertificateComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  dataSource: MatTableDataSource<ExpCertificate> = new MatTableDataSource();
  role: string = '';
  constructor(private eS: ExpcertificateService,private lS:LoginService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    if (this.isAdmin() || this.isExperto()) {
      this.displayedColumns.push('c6', 'c7');
    }
  }
  eliminar(id: number) {
    this.eS.eliminar(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
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
