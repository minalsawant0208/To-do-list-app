import { HttpClient , withFetch} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';
  constructor() { }

  http = inject(HttpClient);


  getUsers(): Observable<UserModel[]>
  {
    return this.http.get<UserModel[]>(this.apiUrl)
  } 

  addUser(user : UserModel) : Observable<UserModel>
  {
    return this.http.post<UserModel>(this.apiUrl,user);
  }

  updateUser(user : UserModel) : Observable<UserModel>
  {
    return this.http.put<UserModel>(`${this.apiUrl}/${user.id}`,user);
  }

  deleteUser(id : number) : Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}
