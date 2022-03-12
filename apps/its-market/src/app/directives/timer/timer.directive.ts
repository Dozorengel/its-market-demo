import { take, tap } from 'rxjs/operators';
import { Directive, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Directive({
  selector: '[appTimer]',
})
export class TimerDirective implements OnInit, OnDestroy {
  @Input('appTimer') dueDate: number;
  @Output() seconds = new EventEmitter<number>();
  subscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.subscription = timer(0, 1000)
      .pipe(
        take(this.dueDate),
        tap(() => this.seconds.emit(--this.dueDate)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
