import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CatService } from '@services/cat.service';
import { MenuComponent } from '@components/menu/menu.component';
import { ImageComponent } from '@components/image/image.component';
import { Cat } from '@models/cat.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, MenuComponent, ImageComponent],
  providers: [CatService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  firstSourceCat!: string;
  secondSourceCat!: string;

  private cats!: Cat[];

  private readonly catService = inject(CatService);

  ngOnInit(): void {
    this.getAllCatPictures();
  }

  getAllCatPictures() {
    this.catService.getAllCatPictures()
        .subscribe(res => {
          this.cats = res;
          this.randomCat();
        });
  }

  private randomCat() {
    const catLength = this.cats.length;
    const firstRandomIndex = this.randomNumber(0, catLength, -1);
    const secondRandomIndex = this.randomNumber(0, catLength, firstRandomIndex);
    this.firstSourceCat = this.cats[firstRandomIndex].url;
    this.secondSourceCat = this.cats[secondRandomIndex].url;
  }

  private randomNumber = (max: number, min: number, except: number): number => {
    const num = Math.floor(Math.random() * (max - min +1)) + min;
    return (num === except) ? this.randomNumber(max, min, except) : num;
  }
}
