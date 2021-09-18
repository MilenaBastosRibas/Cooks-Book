import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'entrar',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./pages/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'detalhar',
    loadChildren: () => import('./pages/detalhar/detalhar.module').then( m => m.DetalharPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'editar-ingrediente',
    loadChildren: () => import('./pages/editar-ingrediente/editar-ingrediente.module').then( m => m.EditarIngredientePageModule)
  },
  {
    path: 'adicionar-ingrediente',
    loadChildren: () => import('./pages/adicionar-ingrediente/adicionar-ingrediente.module').then( m => m.AdicionarIngredientePageModule)
  },
  {
    path: 'entrar',
    loadChildren: () => import('./pages/entrar/entrar.module').then( m => m.EntrarPageModule)
  },
  {
    path: 'inscrever',
    loadChildren: () => import('./pages/inscrever/inscrever.module').then( m => m.InscreverPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
