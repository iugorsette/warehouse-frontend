
import { inject } from '@angular/core';

import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

export const loginGuard = () => {
    const loginService = inject(LoginService);
    const router = inject(Router)

    if (loginService.isLogged) return true;

    return router.navigate(['login'])
};