import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  userList : UserModel[] = [];
  editMode : boolean = false;
  user : UserModel = {

    assignedto : "",
    status : "",
    duedate : "",
    priority : "",
    comments : "",
  }

  constructor(private _userService : UserService,private _toastrService:ToastrService){}
  ngOnInit(): void {
    this.getUserList();
  }
  //  Assignedtolist:string[]=["user1","user2","user3","user4"];
  //  statuslist:string[]=["not started","in progress","completed"];
  //  prioritylist:string[]=["normal","low","high"];
  getUserList()
  {
    this._userService.getUsers().subscribe((res) =>{

      this.userList = res;

    });
  }
    
  onSubmit(form : NgForm) : void
  {
      debugger;
      if(this.editMode)
      {
        console.log(form);
        this._userService.updateUser(this.user).subscribe((res) => {
        this.getUserList();
        this.editMode = false;
        form.reset();
        this._toastrService.success('Task Updated Successfully !','Success');
        });   
      }
      else
      {
      console.log(form);
      this._userService.addUser(this.user).subscribe((res) => {
      this.getUserList();
      form.reset();
      this._toastrService.success('Task Added Successfully !','Success');
      });
      }
      
  }

  onEdit(userdata : UserModel)
  {
     this.user = userdata;
     this.editMode = true;
  }

  onDelete(id : any)
  {
      const isConfirm = confirm('Do you want to delete this task?');
      if(isConfirm)
      {
          this._userService.deleteUser(id).subscribe((res) =>{
          this._toastrService.error('Task deleted successfully','Deleted');
          this.getUserList();
        });
      }
      
  }
}
