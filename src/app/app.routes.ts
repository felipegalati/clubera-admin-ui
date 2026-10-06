import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Navbar } from './navbar/navbar';
import { Users } from './pages/users/users';
import { Clubs } from './pages/clubs/clubs';
import { Login } from './auth/login/login';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
    {
        path: '',
        component: Navbar,
        children: [
            {
            path: '',
            component: Dashboard
            },
            {
                path: 'users',
                component: Users
            },
            {
                path: 'clubs',
                component: Clubs
            },
            {
                path: 'reports',
                component: Reports
            },
        ]
    },
    {
        path: 'login',
        component: Login
    }
];
