import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InitializeService {
  loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoading(payload: boolean) {
    this.loadingSubject.next(payload);
  }
}
