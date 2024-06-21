import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpRecipeService } from '../../../services/sp-recipe.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SpRecipe } from '../../../models/Sp-recipe';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarsp-recipe',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink,NgIf],
  templateUrl: './listarsp-recipe.component.html',
  styleUrl: './listarsp-recipe.component.css'
})
export class ListarspRecipeComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4'];
  dataSource: MatTableDataSource<SpRecipe> = new MatTableDataSource();
  role: string = '';
  constructor(private rS: SpRecipeService,private lS:LoginService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    if (this.isAdmin() || this.isExperto()) {
      this.displayedColumns.push('c5', 'c6');
    }
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
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