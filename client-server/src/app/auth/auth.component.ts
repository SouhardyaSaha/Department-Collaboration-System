import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isRegistrationMode: boolean;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.isRegistrationMode = this.route.snapshot.data['isRegisterMode'];
  }
}
