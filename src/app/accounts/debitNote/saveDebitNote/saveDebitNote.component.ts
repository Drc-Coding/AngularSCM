
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {saveDebitNoteService} from './saveDebitNote.service';


@Component({
  selector: 'app-patientedit',
  templateUrl: './saveDebitNote.component.html',

  providers: [saveDebitNoteService]
 
})
export class saveDebitNoteComponent implements OnInit {




  constructor(private formBuilder: FormBuilder , private userService: saveDebitNoteService) {}

  ngOnInit() {



  }


}