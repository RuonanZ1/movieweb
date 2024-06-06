import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsinfoComponent} from "./filmsinfo/filmsinfo.component";
import {VisualizationComponent} from "./visualization/visualization.component";
import {HomeComponent} from "./home/home.component";
import {AvgRateByRegionComponent} from "./avg-rate-by-region/avg-rate-by-region.component";
import {AllVisualizationComponent} from "./all-visualization/all-visualization.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {MoviedetailComponent} from "./moviedetail/moviedetail.component";
import {Page404Component} from "./page404/page404.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "avgRateRegion", component: AvgRateByRegionComponent},
  {path: "allVisualization", component: AllVisualizationComponent},
  {path: 'films', component: FilmsinfoComponent},
  {path: 'visualization', component: VisualizationComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'detail/:id', component: MoviedetailComponent},
  {path: '**', component: Page404Component},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
