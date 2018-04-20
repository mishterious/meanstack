import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  _id: any;
  pet: any;
  name: any;
  error: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.pet = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.nameByID(this._id);
  }

  nameByID(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.pet = data;
      console.log(data);
    })
  }

  edit(_id) {
    if(this.pet.name.length < 3){
      this.nameByID(this._id);
      this.error = "Your pet must have a better name than that!"
    }
    else if(this.pet.animal_type.length < 4){
      this.nameByID(this._id);
      this.error = "What kind of an animal is?"
    }
    else if(this.pet.description.length < 5){
      this.nameByID(this._id);
      this.error = "Tell us a little more about it"
    }
    else if(this.pet.skill1.length < 2){
      this.nameByID(this._id);
      this.error = "Does your pet have any skills?"
    }
    else {
      let tempObservable = this._httpService.edit(_id, this.pet)
      tempObservable.subscribe(data => {
        this.pet = data;
      });
      this._router.navigate(['/details/',this.pet._id, this.pet.name ]);  
    }
  }

}
