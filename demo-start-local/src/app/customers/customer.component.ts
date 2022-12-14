import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { Customer } from './customer';

function emailMatcher(c: AbstractControl) : {[key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');
  
  if(emailControl?.pristine || confirmControl?.pristine){
    return null;
  }
  
  if(emailControl?.value === confirmControl?.value){
    return null;
  }

  return {'match': true};
}

function ratingRange(min: number, max: number) : ValidatorFn {
  return (c:AbstractControl): {[key:string]: boolean} | null => {
    if(c.value!= null && (isNaN(c.value) || c.value< min || c.value > max))  {
      return {'range': true}
    }
    return null;
  }
}

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
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }
       ,{ validator: [emailMatcher] }),
      phone:'',
      notification: 'email',
      rating: [null, ratingRange(1,5)],
      sendCatalog: true
    })
  }

  populateTestData(): void{
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkess',
      email: 'jack@torchwood.com',
      sendCatalog: false,
      phone:'',
      notification: 'email'
    }); 
   
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if(notifyVia==='text'){
      phoneControl?.setValidators(Validators.required);
    } else{
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  
  }
}
