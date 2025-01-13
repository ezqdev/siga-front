import { Component, inject } from '@angular/core';
import { Header2Component } from "../shared/header2/header2.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitud-area',
  standalone: true,
  imports: [Header2Component, FooterComponent, FullCalendarModule],
  templateUrl: './solicitud-area.component.html',
  styleUrl: './solicitud-area.component.css'
})
export class SolicitudAreaComponent {

  reservation = new Reservation();
  toastSrvc = inject(ToastrService);


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() }
    ],
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: ''
    }
  };


  constructor(private router: Router, private serviceReservation: ReservationService) { }

  irHome(): void {
    this.router.navigate(['home']);
  }

  //Crear Reservation
  crearReservation(): void {

    this.serviceReservation.postReservation(this.reservation).subscribe(
      (result) => {
        if (result.status == 0) {
          this.toastSrvc.warning("Atención");
          return;
        } else {
          this.toastSrvc.success("Reservacion creada con éxito.");
          this.router.navigate(['home']);
        }
      },
      error => {
        alert("Error: " + error);
      });
  }




}
