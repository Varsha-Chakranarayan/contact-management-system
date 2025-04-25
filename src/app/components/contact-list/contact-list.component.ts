import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
itemsPerPage: number = 5;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });

    this.loadContacts();

  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  get paginatedContacts(): Contact[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.contacts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.contacts.length / this.itemsPerPage);
  }

  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  search(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      const filtered = data.filter(contact =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.phone.includes(this.searchTerm)
      );
      this.contacts = filtered;
      this.currentPage = 1; 
    });
  }
  

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.contactService.getContacts().subscribe((data: Contact[]) => {
          this.contacts = data;
        });
      });
    }
  }

}
