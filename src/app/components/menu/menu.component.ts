import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="menu with home page and dashboard rating">
            <mat-icon>menu</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
            <button mat-menu-item>
                <mat-icon>home</mat-icon>
                <span>Voting System</span>
            </button>
            <button mat-menu-item>
                <mat-icon>bar_chart_4_bars</mat-icon>
                <span>Dashboard</span>
            </button>
        </mat-menu>
        <span>Cat Mash</span>
        <span class="spacer"></span>
        <button mat-icon-button aria-label="heart icon">
            <mat-icon>favorite</mat-icon>
        </button>
        <button mat-icon-button aria-label="share icon">
            <mat-icon>share</mat-icon>
        </button>
    </mat-toolbar>
  `,
  styles: `
    .spacer {
        flex: 1 1 auto;
    }
  `
})
export class MenuComponent {
}
