import {Component, OnInit} from '@angular/core';
import {GlobalVariableService} from "../../../../services/global-variable.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(
    public globalVariableService: GlobalVariableService
  ) {
  }

  ngOnInit(): void {
  }
}


