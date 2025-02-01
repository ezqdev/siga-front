import { Component, inject } from '@angular/core';
import { Header2Component } from "../shared/header2/header2.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud-area',
  standalone: true,
  imports: [Header2Component, FooterComponent, FullCalendarModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './solicitud-area.component.html',
  styleUrl: './solicitud-area.component.css'
})
export class SolicitudAreaComponent {

  reservation = new Reservation();
  toastSrvc = inject(ToastrService);

  solicitudAreaForm: FormGroup;


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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private serviceReservation: ReservationService,
    private fb: FormBuilder
  ) {
    this.solicitudAreaForm = this.fb.group({
      reservation_date: ['', Validators.required],
      start_date: ['', [Validators.required]],
      end_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      uploaded_job: ['', Validators.required],
      reservation_details: ['', Validators.required]
    });
  }

  areasId: number | null = null;
  services: any[] = []
  estates: any[] = []
  selectedServices:any[] = []
  selectedEstates:any[] = []

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.areasId = id ? Number(id) : null;
    this.getServices();
    this.getEstates();
  }


  getServices() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/service`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response services', response)
        this.services = response.data;
        console.log('services', this.services)
      }
    });
  }


  getEstates() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/estate`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response estates', response)
        this.estates = response.data;
        console.log('estates', this.estates)
      }
    });
  }

  onSelectService(service: any) {
    console.log('Servicio seleccionado:', service);
    this.selectedServices = [...this.selectedServices, service]
  }

  onSelectEstate(estate: any) {
    console.log('Equipo seleccionado:', estate)
    this.selectedEstates = [...this.selectedEstates, estate]
  }

  irHome(): void {
    this.router.navigate(['home']);
  }

  onSubmit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log('solicitud area form', this.solicitudAreaForm)
    if (this.solicitudAreaForm.valid) {
      this.http.post(`${environment.apiUrl}/reservation`,
        {
          ...this.solicitudAreaForm.value,
          user_id: JSON.parse(localStorage.getItem('user') || '').id,
          space_id: this.areasId,
          status: 'pendiente'
        },
        { headers }
      )
        .subscribe({
          next: (response: any) => {
            console.log('response', response)
            if (response.statusCode !== 200) {
              alert('Algo salió mal')
            } else {
              console.log('response', response)
              this.toastSrvc.success("Reservacion creada con éxito.");
              this.assignItems(response.data.id)
            }
          },
          error: (error) => {
            console.error('Error en login:', error);
          }
        });
    }
  }


  assignItems(reservationId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.post(`${environment.apiUrl}/reservation/assignItems/${reservationId}`,
      {
        estates: this.selectedEstates,
        services: this.selectedServices
      },
      { headers }
    )
      .subscribe({
        next: (response: any) => {
          console.log('response', response)
          if (response.statusCode !== 200) {
            alert('Algo salió mal')
          } else {
            console.log('response', response)
            this.toastSrvc.success("Items asignados con éxito.");
          }
        },
        error: (error) => {
          console.error('Error en login:', error);
        }
      });
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
