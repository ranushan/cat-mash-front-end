import { Routes } from '@angular/router';
import { StatsComponent } from '@views/stats/stats.component';
import { VotingComponent } from '@views/voting/voting.component';

export const routes: Routes = [
    { path: '', component: VotingComponent }, // Load Voting view
    { path: 'stats', component: StatsComponent }, // Load Stats view
    { path: '**', redirectTo: '', pathMatch: 'full' } // Whether ever you access to the ihm you will redirect to voting view
];
