import { NgModule }            from '@angular/core';
import { MatToolbarModule }    from '@angular/material/toolbar';
import { MatSidenavModule }    from '@angular/material/sidenav';
import { MatListModule }       from '@angular/material/list';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatCardModule }       from '@angular/material/card';
import { MatInputModule }      from '@angular/material/input';
import { MatSelectModule }     from '@angular/material/select';
import { MatTableModule }      from '@angular/material/table';
import { MatSnackBarModule }   from '@angular/material/snack-bar';
import { MatDialogModule }     from '@angular/material/dialog';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class MaterialModule {}
