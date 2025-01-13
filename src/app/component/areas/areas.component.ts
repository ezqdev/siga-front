import { Component } from '@angular/core';
import { Header2Component } from "../shared/header2/header2.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
/* calendar */
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [Header2Component, FooterComponent,CommonModule,FullCalendarModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent {


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



  areasId: number | null = null;
  area: any;

  areas = [
    {
      id: 1,
      name: 'DOMO',
      /* image: './assets/img-planos/gimnasio.PNG' */
    },
    {
      id: 2,
      name: 'GIMNASIO AUDITORIO',
      image: './assets/img-planos/gimnasio.PNG'
    },
    {
      id: 3,
      name: 'PARANINFO',
      image: './assets/img-planos/paraninfo.PNG'
    },
    {
      id:4,
      name:'SALA DE USOS MULTIPLES',
      image:'./assets/img-planos/administrativo1.PNG'
    }
  ];



  
  constructor(private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.areasId = id ? Number(id) : null;
    if (this.areasId) {
      this.area = this.areas.find(p => p.id === this.areasId);
    }
  }

  irSolicitud():void{
    this.router.navigate(['solicitud']);
  }

  irHome():void{
    this.router.navigate(['home']);
  }




}
