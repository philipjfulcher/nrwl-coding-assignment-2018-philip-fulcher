import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ticket-dialog',
  templateUrl: './add-ticket-dialog.component.html',
  styleUrls: ['./add-ticket-dialog.component.css']
})
export class AddTicketDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTicketDialogComponent>, private fb: FormBuilder) { 
    this.form = this.fb.group(
      {
        'description': ['', [Validators.required, Validators.minLength(1)]]
      }
    )
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if(this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }

}