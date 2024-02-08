import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="cat-card">
        <img style="width: 350px; height: 350px;" mat-card-image [src]="source" alt="Picture of cat">
        <mat-card-actions style="justify-content: center;">
            <div class="favorite-button-container">
                <button mat-fab color="accent" aria-label="favorite icon">
                    <mat-icon>favorite</mat-icon>
                </button>
            </div>
        </mat-card-actions>
    </mat-card>
  `,
  styles: `
    .cat-card {
        max-width: 400px;
    }

    .favorite-button-container {
        display: flex;
        justify-content: center;
        width: 120px;
    }
  `
})
export class ImageComponent {

  @Input() source!: string;

}
