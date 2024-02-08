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

    items: MenuItem[] = [
        { iconName: 'home', name: 'Voting System', routerLink: 'voting' },
        { iconName: 'bar_chart_4_bars', name: 'Dashboard', routerLink: 'stats' },
    ];

    title: string = 'Cat Mash';

    actions: MenuAction[] = [
        { iconName: 'share', clickEvent: () => window.location.href = 'https://github.com/ranushan' }
    ];
}
