import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean|UrlTree {
    const id = parseInt(route.paramMap.get('id')!);
    if (isNaN(id)) {
      this.router.navigate(['not-found']);
    } 
    return true;
  }
}
