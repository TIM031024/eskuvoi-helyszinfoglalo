import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { Venue } from '../../models/venue.model';
import { PriceFormatPipe } from '../../shared/price-format.pipe';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    PriceFormatPipe
  ],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent {
  venues: Venue[] = [
    {
      id: 1,
      name: 'Rózsakert Étterem',
      location: 'Budapest',
      capacity: 120,
      price: 500000,
      availableDates: ['2025-06-12', '2025-07-03'],
      imageUrl: 'https://placehold.co/400x200?text=Helyszín+1'
    },
    {
      id: 2,
      name: 'Tóparti Villa',
      location: 'Balatonfüred',
      capacity: 80,
      price: 420000,
      availableDates: ['2025-05-18', '2025-06-25'],
      imageUrl: 'https://placehold.co/400x200?text=Helyszín+2'
    }
  ];
}
