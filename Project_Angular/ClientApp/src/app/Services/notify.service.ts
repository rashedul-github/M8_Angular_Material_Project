import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(public snackBar: MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration: 3000
    //duration: 3000,
    //horizontalPosition: 'right',
    //verticalPosition: 'top'
  }

  message(msg, actions) {
    this.snackBar.open(msg, actions, this.config);
  }
}
