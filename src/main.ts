import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app/app';

// ✅ import routes file
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes) // ✅ THIS is the fix
  ]
})
.catch(err => console.error(err));




// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { App } from './app/app';

// // Import your components
// import { Register } from './app/pages/register/register';
// import { Login } from './app/pages/login/login';

// bootstrapApplication(App, {
//   providers: [
//     importProvidersFrom(HttpClientModule),
//     provideRouter([
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//       { path: 'login', component: Login },
//       { path: 'register', component: Register }
//       // add more routes here
//     ])
//   ]
// })
// .catch((err) => console.error(err));