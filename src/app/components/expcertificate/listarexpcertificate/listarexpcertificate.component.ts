import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpCertificate } from '../../../models/ExpCertificate';
import { ExpcertificateService } from '../../../services/expcertificate.service';

@Component({
  selector: 'app-listarexpcertificate',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './listarexpcertificate.component.html',
  styleUrl: './listarexpcertificate.component.css'
})
export class ListarexpcertificateComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  dataSource: MatTableDataSource<ExpCertificate> = new MatTableDataSource();
  constructor(private eS: ExpcertificateService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

    });
    this.eS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
