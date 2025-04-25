import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactService: any;
  contact: Contact | undefined;


  constructor() { }

  ngOnInit(): void {
  }
  editContact(id: number): void {
  }
  
  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
    }
}
}
