import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';

import { DishService } from './services/dish.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

import { PromotionService } from './services/promotion.service';



import { LeaderService } from './services/leader.service';

import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  entryComponents: [
        LoginComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpModule,
	RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [DishService, PromotionService, LeaderService, ProcessHttpmsgService, 
  {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
