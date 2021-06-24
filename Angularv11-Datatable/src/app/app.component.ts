import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { User } from '../app/models/user';
import { DataService } from '../app/services/data.service';
import { AddUserComponent } from '../app/users/add-user/add-user.component'
import { DeleteUserComponent } from '../app/users/delete-user/delete-user.component'
import { EditUserComponent } from '../app/users/edit-user/edit-user.component'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Angular11-DataTable-CRUD';
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Address', 'actions'];
  dataSource: any;
  users: User[];
  user: User;
  index: number;
  id: number;
  constructor(private dataService: DataService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.getUsers();

  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource<any>(this.users);
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  
  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent
    );
    const sub = dialogRef.componentInstance.isUserAdded.subscribe((data: any) => {

      data.id = this.users.length + 1;
      this.users.splice(0, 0, data);
      this.ref.detectChanges();

      this.dataSource = this.users;
      this.dataSource = new MatTableDataSource<any>(this.users);
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  editDialog(i: number, id: number) {
    this.id = id;
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { id: id }
    });
    const sub = dialogRef.componentInstance.isUserUpdated.subscribe((data: any) => {
      this.users.splice(i, 1);
      data.id = this.id;
      this.users.splice(i, 0, data);
      this.ref.detectChanges();
      this.dataSource = this.users;
      this.dataSource = new MatTableDataSource<any>(this.users);
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //success
      }
    });
  }
  deleteDialog(i: number, id: number, FirstName: string, LastName: string, Email: string, Address: string) {

    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { id: id, FirstName: FirstName, LastName: LastName, Email: Email, Address: Address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
        this.users.splice(i, 1);
      this.ref.detectChanges();
      this.dataSource = this.users;
      this.dataSource = new MatTableDataSource<any>(this.users);
      }
      
    });
  }
  getUsers(): void {
    this.dataService.getUsers()
      .subscribe(serviceResult => {
        this.users = serviceResult;
        this.dataSource = this.users;
        this.dataSource.paginator = this.paginator;
      });
  }
}
