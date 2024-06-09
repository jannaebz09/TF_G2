import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../models/User';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listaruser',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './listaruser.component.html',
  styleUrl: './listaruser.component.css',
})
export class ListaruserComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  constructor(private uS: UserService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

    });
    this.uS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
