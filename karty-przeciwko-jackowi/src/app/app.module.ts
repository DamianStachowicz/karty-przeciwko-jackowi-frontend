import { CardComponent } from './card/card.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CardSelectPage } from './card-select/card-select.page';
import { CardSelectPageModule } from './card-select/card-select.module';
import { CurrentQuestionPageModule } from './current-question/current-question.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    CardSelectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CardSelectPageModule,
    CurrentQuestionPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
