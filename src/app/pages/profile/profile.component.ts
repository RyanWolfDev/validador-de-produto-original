import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "profile",
  moduleId: module.id,
  templateUrl: "profile.component.html",
  styleUrls: ["../../layouts/admin-layout/admin-layout.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({});

  ngOnInit() {}
}
