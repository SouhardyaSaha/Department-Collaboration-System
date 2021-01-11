import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutineGeneratorComponent } from './routine-generator.component';
import { RoutineListComponent } from './routine-list/routine-list.component';

const routes: Routes = [
  // {path: '',component : RoutineGeneratorComponent},
  // {path: 'list',component : RoutineListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutineRoutingModule {}
