import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

 
  private contacts: Contact[] = [
    new Contact(1, 'Komal', 'komal@example.com', '1234567890'),
    new Contact(2, 'Priya', 'priya@example.com', '9876543210'),
    new Contact(3, 'Varsha', 'varsha@example.com', '6787675445'),
    new Contact(3, 'Shwetha', 'shwetha@example.com', '6787675445'),
    new Contact(1, 'sonu', 'sonu@example.com', '1234567890'),
    new Contact(2, 'vamsee', 'vamsee@example.com', '9876743210'),
    new Contact(3, 'Linga', 'linga@example.com', '6767675445'),
    new Contact(3, 'noor', 'noor@example.com', '5787675445')
  ];

  getContacts(): Observable<Contact[]> {
    return of(this.contacts);
  }

  getContact(id: number): Observable<Contact> {
    const contact = this.contacts.find(c => c.id === id);
    return of(contact!); 
  }

  addContact(contact: Contact): Observable<Contact> {
    if (this.contacts.some(c =>
      c.email.toLowerCase() === contact.email.toLowerCase() ||
      c.phone === contact.phone
    )) {
      return throwError(() => new Error('Duplicate entry: email or phone number already exists.'));
    }

    contact.id = Date.now();

    this.contacts.push(contact);
    return of(contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
    }
    return of(contact);
  }

  deleteContact(id: number): Observable<boolean> {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    return of(true);
  }
  

  getAllContacts(): Contact[] {
    return this.contacts;
  }
}

