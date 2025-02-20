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
      uploaded_job: [''],
      reservation_details: [''],
      more_stuff: ['']
    });
  }

  areasId: number | null = null;
  services: any[] = []
  estates: any[] = []
  inputs: any[] = []
  selectedServices:any[] = []
  selectedEstates:any[] = []
  selectedInputs:any[] = []
  mostrarMensaje = false;
  eventTypes:any[] = [];
  anotherEventType = false;
  newEventType = '';

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.areasId = id ? Number(id) : null;
    this.getServices();
    this.getEstates();
    this.getInputs();
    this.getEventTypes();
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


  getInputs() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/input`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response inputs', response)
        this.inputs = response.data;
        console.log('inputs', this.inputs)
      }
    });
  }

  getEventTypes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/event-types`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response inputs', response)
        this.eventTypes = [ ...response.data,  { name: 'Otro' }];
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

  onSelectInput(input: any) {
    console.log('Insumo seleccionado:', input)
    this.selectedInputs = [...this.selectedInputs, input]
  }

  onSelectEventType(e: any) {
    console.log('etn', e.target.value)
    if(e.target.value.toUpperCase()=== "OTRO"){
      console.log('entro aca')
      this.anotherEventType = true;
    }else{
      this.anotherEventType = false;
    }
  }


  onSetAnotherEventType(e:any){
    this.newEventType = e.target.value;
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

      if(this.anotherEventType){
        this.http.post(`${environment.apiUrl}/event-types`,
          {
            name: this.newEventType,
          },
          { headers }
        )
          .subscribe({
            next: (response: any) => {
              console.log('response', response)
              if (response.statusCode !== 201) {
                alert('Algo salió mal')
              } else {
                this.eventTypes = [...this.eventTypes, { name: this.newEventType }]
              }
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
      }


      const formData = new FormData();
      formData.append('reservation_date', this.solicitudAreaForm.get('reservation_date')?.value)
      formData.append('start_date', this.solicitudAreaForm.get('start_date')?.value)
      formData.append('end_date', this.solicitudAreaForm.get('end_date')?.value)
      formData.append('start_time', this.solicitudAreaForm.get('start_time')?.value)
      formData.append('end_time', this.solicitudAreaForm.get('end_time')?.value)
      formData.append('uploaded_job', this.anotherEventType ? this.newEventType : this.solicitudAreaForm.get('uploaded_job')?.value )
      formData.append('reservation_details', this.solicitudAreaForm.get('reservation_details')?.value )
      formData.append('more_stuff', this.solicitudAreaForm.get('more_stuff')?.value)
      formData.append('user_id',JSON.parse(localStorage.getItem('user') || '').id)
      formData.append('space_id', this.areasId as any)
      formData.append('status', 'pendiente')

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.http.post(`${environment.apiUrl}/reservation`,
        formData,
        { headers }
      )
        .subscribe({
          next: (response: any) => {
            console.log('response', response)
            if (response.statusCode !== 200) {
              alert('Algo salió mal')
            } else {
              console.log('response', response)
              this.assignItems(response.data.id)
              this.mostrarMensaje = true;
              setTimeout(() => {
                this.mostrarMensaje = false;
              }, 3000)
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
        services: this.selectedServices,
        inputs: this.selectedInputs
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
            this.mostrarMensaje = true;
            setTimeout(() => {
              this.mostrarMensaje = false;
            }, 3000)
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
