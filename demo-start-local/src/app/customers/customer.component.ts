import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Customer } from './customer';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  customerForm!: FormGroup;
  customer = new Customer();

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: '',
      lastName: {value: 'n/a', disabled: true},
      email: '',
      sendCatalog: true
    })
    
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });
  }

  populateTestData(): void{
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkess',
      email: 'jack@torchwood.com',
      sendCatalog: false
    }); 

    // this.customerForm.patchValue({
    //   firstName: 'Jack',
    //   lastName: 'Harkess',      
    //   sendCatalog: false
    // }); 
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
