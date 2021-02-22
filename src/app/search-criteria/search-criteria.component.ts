import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  emitSubmitEvent = (form: NgForm): void => {
    console.log(form.form.value);
    this.submitEvent.emit(form.form.value);
    setTimeout(() => {
      form.reset();
    }, 500);
  };
}
