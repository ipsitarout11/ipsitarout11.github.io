import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { DataService } from '../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'add-user.component',
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.scss']
})

export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  user: User;
  @Output() isUserAdded = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.addUserForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Address: ['', Validators.required]
      
    });
  }
  public addNewUser(): void {
    this.user = Object.assign({}, this.addUserForm.value);
    this.dataService.addUser(this.user)
      .subscribe(serviceResult => {
        this.isUserAdded.emit(this.user);
        this.dialogRef.close();
        this._snackBar.open('User created succesfully.', 'Created', {
          duration: 2000,
          panelClass: 'snackbar'
        });
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
