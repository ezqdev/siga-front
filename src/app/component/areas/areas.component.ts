import { Component } from '@angular/core';
import { Header2Component } from "../shared/header2/header2.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
/* calendar */
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [Header2Component, FooterComponent, CommonModule, FullCalendarModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent {


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    weekends: true,
    hiddenDays: [],
    events: [],
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: ''
    }
  };



  areasId: number | null = null;
  area: any;
  reservationsByArea: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }


  transformReservationsToEvents(reservations: any[]) {
    const events = reservations.map(reservation => ({
      title: `${reservation.uploaded_job}`,
      start: `${reservation.start_date}T${reservation.start_time}`,
      end: `${reservation.end_date}T${reservation.end_time}`,
      extendedProps: {
        status: reservation.status,
        details: reservation.reservation_details
      }
    }));

    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: 'es',
      weekends: false,
      events: events,
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: ''
      },
      // Opcional: Colorear eventos según status
      eventDisplay: 'block',
      eventColor: '#dc3545',
      eventDidMount: (info) => {
        if (info.event.extendedProps['status'] === 'pendiente') {
          info.el.style.backgroundColor = '#dc3545'; // amarillo para pendientes
        }
      }
    };
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.areasId = id ? Number(id) : null;
    if (this.areasId) {
      this.getArea(this.areasId)
      this.getReservationsByArea(this.areasId)
    }
  }


  getArea(areaId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get(`${environment.apiUrl}/space/${areaId}`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response area', response)
        this.area = response.data[0]
      }
    });
  }

  getReservationsByArea(areaId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get(`${environment.apiUrl}/reservation/bySpace/${areaId}`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response reservations', response)
        this.reservationsByArea = response.data
        this.transformReservationsToEvents(response.data)
      }
    });
  }

  irSolicitud(): void {
    this.router.navigate(['solicitud-area', this.areasId]);
  }

  irHome(): void {
    this.router.navigate(['home']);
  }




}
