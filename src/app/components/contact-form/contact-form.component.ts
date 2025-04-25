import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  contactId: number | null = null;
  // errorMessage: string | null = null;
  errorMessage: string = '';



  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.contactId !== null) {
      const contact = this.contactService.getContact(this.contactId);
      if (contact) {
        this.contactForm.patchValue(contact);
      }
    }
  }
onSubmit(): void {
  if (this.contactForm.invalid) {
    return;
  }

  const contact: Contact = {
    id: this.contactId ?? Date.now(),
    ...this.contactForm.value,
  };

 
  const isDuplicate = this.contactService.getAllContacts().some(c =>
    (c.email === contact.email || c.phone === contact.phone) &&
    c.id !== this.contactId 
  );

  
  if (isDuplicate) {
    this.errorMessage = 'Duplicate entry: email or phone number already exists.';
    return;
  }

  this.errorMessage = ''; 


  if (this.contactId) {
    this.contactService.updateContact(contact);
  } else {
    this.contactService.addContact(contact);
  }

  this.router.navigate(['/contacts']);
}

}



