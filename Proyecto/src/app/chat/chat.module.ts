import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';


@NgModule({
  declarations: [
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    ChatService
  ],
  exports:[
    ChatDialogComponent
  ]
})
export class ChatModule { }
