import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/Role';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarrole',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  constructor(private rS: RoleService) {}
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
