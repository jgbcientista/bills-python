import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.modules';

import { AppComponent } from './app.component';
import { BillNavbarComponent } from './bill-navbar/bill-navbar.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContasComponent } from './contas/contas.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

registerLocaleData(ptBr)

@NgModule({
    declarations: [
        AppComponent,
        BillNavbarComponent,
        HomeComponent,
        ContasComponent,
        HeaderComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        RouterModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
    bootstrap: [AppComponent]
})
export class AppModule { }