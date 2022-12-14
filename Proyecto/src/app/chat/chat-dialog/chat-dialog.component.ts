import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable, scan } from 'rxjs';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable();
  }

  sendMessage(){
    this.chat.converse(this.formValue);
    this.formValue='';
  }

}
