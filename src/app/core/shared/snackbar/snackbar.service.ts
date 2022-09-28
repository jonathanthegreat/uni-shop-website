import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from "./snackbar.component";

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {
  constructor(private matSnackBar: MatSnackBar) {
  }

  snackBar(data: string) {
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      panelClass: ['action-snackbar'],
      data: {
        data
      }
    });
  }
}
