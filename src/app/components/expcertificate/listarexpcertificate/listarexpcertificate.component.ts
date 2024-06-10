import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpCertificate } from '../../../models/ExpCertificate';
import { ExpcertificateService } from '../../../services/expcertificate.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarexpcertificate',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './listarexpcertificate.component.html',
  styleUrl: './listarexpcertificate.component.css'
})
export class ListarexpcertificateComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7'];
  dataSource: MatTableDataSource<ExpCertificate> = new MatTableDataSource();
  constructor(private eS: ExpcertificateService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminar(id: number) {
    this.eS.eliminar(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
