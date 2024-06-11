import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpRecipeService } from '../../../services/sp-recipe.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SpRecipe } from '../../../models/Sp-recipe';

@Component({
  selector: 'app-listarsp-recipe',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './listarsp-recipe.component.html',
  styleUrl: './listarsp-recipe.component.css'
})
export class ListarspRecipeComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6'];
  dataSource: MatTableDataSource<SpRecipe> = new MatTableDataSource();
  constructor(private rS: SpRecipeService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}