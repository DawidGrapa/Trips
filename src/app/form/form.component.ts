import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trips } from '../Trips';
import { ITour } from '../ITour';
import { TripProviderService } from '../services/tripProvider.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  todayDate = new Date();
  @Output() add = new EventEmitter<any>();

  fields = Object.keys(trips[0]);
  modelForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private tourService: TripProviderService) {
    
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      capacity: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      description: ['', Validators.required],
      img_link: ['', Validators.required]
    });
   }


  submit(modelForm: FormGroup): void{

    const startDate = new Date(modelForm.value.start_date);
    const endDate = new Date(modelForm.value.end_date);
    const toSendStartDate: string = startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate();
    const toSendEndDate: string = endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate();


    const newTrip: any = {
      name: modelForm.value['name'],
      country: modelForm.value['country'],
      start_date: toSendStartDate,
      end_date: toSendEndDate,
      price: modelForm.value['price'],
      capacity: modelForm.value['capacity'],
      description: modelForm.value['description'],
      rate: -1,
      img_link: modelForm.value['img_link']
    }

    this.tourService.addTour(newTrip);
    alert("Pomyślnie dodano wycieczkę!");
    modelForm.reset();
  }

  nameValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['name'].touched && !modelForm.controls['name'].valid;
  }

  countryValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['country'].touched && !modelForm.controls['country'].valid;
  }

  startDateValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['start_date'].touched && !modelForm.controls['start_date'].valid;
  }

  endDateValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['end_date'].touched && !modelForm.controls['end_date'].valid;
  }

  priceValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['price'].touched && !modelForm.controls['price'].valid;
  }

  capacityValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['capacity'].touched && !modelForm.controls['capacity'].valid;
  }

  descriptionValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['description'].touched && !modelForm.controls['description'].valid;
  }

  imgLinkValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['img_link'].touched && !modelForm.controls['img_link'].valid;
  }
}


