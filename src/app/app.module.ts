import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {FilmsinfoComponent} from './filmsinfo/filmsinfo.component';
import {HttpClientModule} from "@angular/common/http";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';
import {MenuFoldOutline} from '@ant-design/icons-angular/icons';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconDefinition} from '@ant-design/icons-angular';
// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import {AccountBookFill, AlertFill, AlertOutline} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzAlertComponent} from "ng-zorro-antd/alert";
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzRateModule} from 'ng-zorro-antd/rate';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VisualizationComponent} from './visualization/visualization.component';
import {HomeComponent} from './home/home.component';
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {AvgRateByRegionComponent} from './avg-rate-by-region/avg-rate-by-region.component';
import {AllVisualizationComponent} from './all-visualization/all-visualization.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {CalendarComponent} from './calendar/calendar.component';
import {NzBadgeComponent} from "ng-zorro-antd/badge";
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {SearchComponent} from './search/search.component';
import {NzAffixModule} from 'ng-zorro-antd/affix';
import {MoviedetailComponent} from './moviedetail/moviedetail.component';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {Page404Component} from './page404/page404.component';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import { NzCommentModule } from 'ng-zorro-antd/comment';


@NgModule({
  declarations: [
    AppComponent,
    FilmsinfoComponent,
    VisualizationComponent,
    HomeComponent,
    AvgRateByRegionComponent,
    AllVisualizationComponent,
    CalendarComponent,
    SearchComponent,
    MoviedetailComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts') // 异步加载echarts
    }),
    NzButtonModule,
    HttpClientModule,
    NzTableModule,
    NzMenuModule,
    NzIconDirective,
    NzTooltipDirective,
    NzIconModule.forRoot(icons),
    NzLayoutModule,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    BrowserAnimationsModule,
    NzMessageModule,
    NzEmptyModule,
    NzSpinModule,
    NzBackTopModule,
    NzAlertComponent,
    NzPaginationModule,
    NzListModule,
    NzRateModule,
    FormsModule,
    NzSwitchComponent,
    NzSelectModule,
    NzDropDownModule,
    NzCalendarModule,
    NzBadgeComponent,
    NzStatisticModule,
    NzRowDirective,
    NzColDirective,
    NzGridModule,
    NzInputModule,
    NzAffixModule,
    NzAvatarModule,
    NzResultModule,
    NzTypographyComponent,
    ReactiveFormsModule,
    NzDescriptionsModule,
    NzCommentModule,
  ],
  providers: [
    {provide: NZ_ICONS, useValue: [MenuFoldOutline]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
