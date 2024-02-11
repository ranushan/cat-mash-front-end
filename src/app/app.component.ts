import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuAction, MenuComponent, MenuItem } from '@components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

    // Header => Adding Menu on the left side home menu and leaderboard
    items: MenuItem[] = [
        { iconName: 'home', name: 'Voting System', routerLink: '' },
        { iconName: 'bar_chart_4_bars', name: 'Leaderboard', routerLink: 'stats' },
    ];

    // Header => Title
    title: string = 'Cat Mash';

    // Header => Adding to my own github website
    actions: MenuAction[] = [
        { iconName: 'share', clickEvent: () => window.location.href = 'https://github.com/ranushan' }
    ];
}
