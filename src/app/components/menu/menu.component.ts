import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="menu with items">
            <mat-icon>menu</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
        @for (item of items; track items) {
            <button mat-menu-item [routerLink]="item.routerLink">
                <mat-icon>{{item.iconName}}</mat-icon>
                <span>{{item.name}}</span>
            </button>
        }
        </mat-menu>
        <span>{{title}}</span>
        <span class="spacer"></span>
        @for (action of actions; track actions) {
            <button mat-icon-button aria-label="action button icon" (click)="action.clickEvent()">
                <mat-icon>{{action.iconName}}</mat-icon>
            </button>
        }
    </mat-toolbar>
  `,
  styles: `
    .spacer {
        flex: 1 1 auto;
    }
  `
})
export class MenuComponent {
    @Input() items!: MenuItem[]; // Header => Menu item available from Left side
    @Input() title!: string; // Header for Title
    @Input() actions!: MenuAction[]; // Header => Actions available from Right side
}

// TYPING
export type MenuItem = { iconName: string, name: string, routerLink: string }
export type MenuAction = { iconName: string, clickEvent: () => void }