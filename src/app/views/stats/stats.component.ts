import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Cat } from '@models/cat.model';
import { CatService } from '@services/cat.service';
import { HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
  providers: [CatService],
  template: `
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Ex. MTgwODA3MA" #input>
    </mat-form-field>

    <div class="mat-elevation-z8">
      @if(!dataLoading) {
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
            <td mat-cell *matCellDef="let row"> {{row.id}} </td>
          </ng-container>
        
          <!-- Progress Url -->
          <ng-container matColumnDef="url">
            <th mat-header-cell *matHeaderCellDef> Image URL </th>
            <td mat-cell *matCellDef="let row"> <img style="width: 10em; height: 10em;" [src]="row.url"/> </td>
          </ng-container>
        
          <!-- Name Votes -->
          <ng-container matColumnDef="votes">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Votes </th>
            <td mat-cell *matCellDef="let row"> {{row.votes}} </td>
          </ng-container>
        
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      
          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
          </tr>
        </table>
      } @else {
        <div style="display: flex; justify-content: center; align-items: center; text-align: center; min-height: 100vh;">
          <mat-spinner></mat-spinner>
        </div>
      }
      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of cat"></mat-paginator>
    </div>
  `,
  styles: `
    table {
      width: 100%;
    }

    .mat-mdc-form-field {
      font-size: 14px;
      width: 100%;
    }

    td, th {
      width: 25%;
    }
  `
})
export class StatsComponent implements OnInit {

  // SOURCING FOR TABLE
  displayedColumns: string[] = ['id', 'url', 'votes']; // Column you want to display
  dataSource!: MatTableDataSource<Cat>; // Source of data
  dataLoading = true;

  // Assign variable to element
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Get node of paginator
  @ViewChild(MatSort) sort!: MatSort; // Get node of sort

  // INJECT SERVICES
  private readonly catService = inject(CatService);

  // Initialization of component
  ngOnInit(): void {
    this.getAllCatPictures();
  }

  /**
   * Get all cat pictures
   */
  private getAllCatPictures(): void {
    this.catService.getAllCatPictures()
        .pipe(finalize(() => this.dataLoading = false))
        .subscribe({
          next  : res => {
            this.dataSource = new MatTableDataSource(res); // Assign the data to the data source for the table to render
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error : err => console.error("Error when you getting pics.", err)
        });
  }

  /**
   * Filter from table
   * @param event Get input from user
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}