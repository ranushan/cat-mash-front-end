import { Routes } from '@angular/router';
import { StatsComponent } from '@views/stats/stats.component';
import { VotingComponent } from '@views/voting/voting.component';

export const routes: Routes = [
    { path: 'voting', component: VotingComponent },
    { path: 'stats', component: StatsComponent },
    { path: '**', redirectTo: 'voting', pathMatch: 'full' }
];
