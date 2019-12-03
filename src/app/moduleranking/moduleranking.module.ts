import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FoldderrankRouting } from "./moduleranking.routing";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FolderrankingComponent } from "./folderranking/folderranking.component";
import { ModulerankingComponent } from "./moduleranking.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(FoldderrankRouting),
      SharedModule, 
    
    ],
    declarations: [FolderrankingComponent,ModulerankingComponent],
    providers: [NotificationsComponent]
  })

  export class RankingModule{
      
}