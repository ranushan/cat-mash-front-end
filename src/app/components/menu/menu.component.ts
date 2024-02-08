import { Component, Input } from '@angular/core';
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
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="menu with items">
            <mat-icon>menu</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
        @for (item of items; track items) {
            <button mat-menu-item>
                <mat-icon>{{item.iconName}}</mat-icon>
                <span>{{item.name}}</span>
            </button>
        }
        </mat-menu>
        <span>{{title}}</span>
        <span class="spacer"></span>
        @for (action of actions; track actions) {
            <button mat-icon-button aria-label=" action button icon" (click)="action.clickEvent()">
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

    @Input() items: MenuItem[] = [
        { iconName: 'home', name: 'Voting System' },
        { iconName: 'bar_chart_4_bars', name: 'Dashboard' }
    ];

    @Input() title: string = 'Cat Mash';

    @Input() actions: MenuAction[] = [
        { iconName: 'share', clickEvent: () => window.location.href = 'https://github.com/ranushan' }
    ];
}

export type MenuItem = { iconName: string, name: string }
export type MenuAction = { iconName: string, clickEvent: () => void }