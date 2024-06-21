import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../models/User';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common'; 
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listaruser',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    NgIf
  ],
  templateUrl: './listaruser.component.html',
  styleUrls: ['./listaruser.component.css'],
})
export class ListaruserComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  role: string = '';
  constructor(private uS: UserService,private lS:LoginService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; 
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; 
    });
  }

  eliminar(id: number) {
    this.uS.eliminar(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator; 
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
