import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ImageComponent } from '@components/image/image.component';
import { Cat } from '@models/cat.model';
import { CatService } from '@services/cat.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [HttpClientModule, ImageComponent, MatProgressSpinnerModule],
  providers: [CatService],
  template: `
    @if(!dataLoading) {
      <div style="display: flex; justify-content: center;">
        <img style="width: 10%;" src="assets/cat_cutest.jpg" alt="Cutest picture of cat">
      </div>
      <h1 style="display: flex; justify-content: center;">Voting for your favorite cat !!!</h1>
      <div style="display: flex; gap: 4em; justify-content: center;">
          <app-image [cat]="leftCat"  (catLiked)="voteCatPicture($event)"></app-image>
          <app-image [cat]="rightCat" (catLiked)="voteCatPicture($event)"></app-image>
      </div>
    } @else {
      <div style="display: flex; justify-content: center; align-items: center; text-align: center; min-height: 100vh;">
        <mat-spinner></mat-spinner>
      </div>
    }
  `
})
export class VotingComponent implements OnInit {

  // DECLARATION VARIABLES
  leftCat!: Cat;
  rightCat!: Cat;
  dataLoading = true;

  // STORING VALUE
  private cats!: Cat[];

  // INJECT SERVICES
  private readonly catService = inject(CatService);
  private readonly router = inject(Router);

  /**
   * Load when you init the component
   */
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
            this.cats = res; // Store all cats
            this.randomCat(); // Put random images for left pics and right pics
          },
          error : err => console.error("Error when you getting pics.", err)
        });
  }

  /**
   * Logic random cat
   */
  private randomCat(): void {
    const catLength = this.cats.length;
    const firstRandomIndex = this.randomNumber(0, catLength, -1);
    const secondRandomIndex = this.randomNumber(0, catLength, firstRandomIndex);
    this.leftCat = this.cats[firstRandomIndex];
    this.rightCat = this.cats[secondRandomIndex];
  }

  /**
   * Random value function
   * @param max Max value
   * @param min Min value
   * @param except Except value
   * @returns Return random value
   */
  private randomNumber = (max: number, min: number, except: number): number => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === except) ? this.randomNumber(max, min, except) : num;
  }

  /**
   * Voting favorite cat
   * @param id Identification of picture
   */
  voteCatPicture(id: string): void {
    this.catService.voteCatPicture(id)
        .subscribe({
          next  : () => this.router.navigateByUrl('stats'),
          error : err => console.error("Error when you voting pics.", err)
        });
  }
}
