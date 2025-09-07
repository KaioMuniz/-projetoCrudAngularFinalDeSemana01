import { RouterModule, Routes } from '@angular/router';
import { Musica } from './musica/musica';
import { MusicaCreate } from './musica-create/musica-create';
import { MusicaEdit } from './musica-edit/musica-edit';
import { NgModule } from '@angular/core';

export const routes: Routes = [


  { path: '', redirectTo: '/musica', pathMatch: 'full' },
  { path: 'musica', component: Musica },
  { path: 'musica-create', component: MusicaCreate },
  { path: 'musica-edit', component: MusicaEdit },
  { path: '**', redirectTo: '/musica' }


];

