import { Routes } from '@angular/router';
import { PageAComponent } from './component/page-a/page-a.component';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { UsuarioComponent } from './component/perfil/usuario/usuario.component';
import { AreasComponent } from './component/areas/areas.component';
import { SolicitudAreaComponent } from './component/solicitud-area/solicitud-area.component';
import { AdministradorComponent } from './component/administrador/administrador.component';
import { AdminSolicComponent } from './component/solicitudes/admin-solic/admin-solic.component';
import { AdminUsuariosComponent } from './component/solicitudes/admin-usuarios/admin-usuarios.component';
import { AdminEquiposComponent } from './component/solicitudes/admin-equipos/admin-equipos.component';
import { AdminEspaciosComponent } from './component/solicitudes/admin-espacios/admin-espacios.component';
import { AdminBienesComponent } from './component/solicitudes/admin-bienes/admin-bienes.component';
import { AreasDisponiblesComponent } from './component/areas-disponibles/areas-disponibles.component';
import { SolicitudUserComponent } from './component/solicitud-user/solicitud-user.component';

export const routes: Routes = [

    {path: 'auth', component:AuthComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'home', component:HomeComponent},
    {path: 'area/:id', component:AreasComponent},
    {path: 'solicitud' , component:SolicitudAreaComponent},
    {path: 'admin' , component:AdministradorComponent},
    {path: 'disponible' , component:AreasDisponiblesComponent},

    {path: 'usuario', component:UsuarioComponent},
    //solicitudes
    {path: 'adminsoli', component:AdminSolicComponent},
    {path: 'adminusuarios', component:AdminUsuariosComponent},
    {path: 'adminequipos', component:AdminEquiposComponent},
    {path: 'adminespacio', component:AdminEspaciosComponent},
    {path: 'adminbienes', component:AdminBienesComponent},
    {path: 'user', component:SolicitudUserComponent},


    { path: '', component: PageAComponent } // Ruta predeterminada
];
