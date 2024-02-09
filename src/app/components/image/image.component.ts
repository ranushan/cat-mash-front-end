import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Cat } from '@models/cat.model';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    @if (cat) {
      <mat-card class="cat-card">
          <img style="width: 300px; height: 300px;" mat-card-image [src]="cat.url" alt="Picture of cat">
          <mat-card-actions style="justify-content: center;">
              <div class="favorite-button-container">
                  <button mat-fab color="accent" aria-label="favorite icon" (click)="onClickLiked()">
                      <mat-icon>favorite</mat-icon>
                  </button>
              </div>
          </mat-card-actions>
      </mat-card>
    }
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {

  @Input() cat!: Cat; // Actual Cat which choose by user

  @Output() catLiked = new EventEmitter<string>(); // Create event for producing id of picture

  onClickLiked = (): void => this.catLiked.emit(this.cat.id); // if event is producing something then emit otherwise do nothing

}
