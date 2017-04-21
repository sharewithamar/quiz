import { animate,group,state, style, transition, trigger } from '@angular/animations';
import { AnimationEntryMetadata } from "@angular/core";

export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);

export const routeSlideStateTrigger = trigger('routeSlideState', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
      opacity: 0
    }),
    animate(300)
  ]),
  transition(':leave', animate(300, style({
    transform: 'translateY(100%)',
    opacity: 0
  })))
]);


export const customTrigger = trigger('customSlideState', [

state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
]);


export const slideInDownAnimation =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);


export const buttonStateTrigger = trigger('buttonState', [
  state('valid', style({
  //  backgroundColor: 'lightgreen',
    borderColor: 'green',
 //   color: 'green'
  })),
  state('invalid', style({
  //  backgroundColor: '#5cb85c',
//color: 'white',
    borderColor: '#5cb85c'
  })),

  transition('* => valid', [
    group([
      animate(100, style({
        transform: 'scale(1.3)'
      })),
      animate(200, style({
        borderColor: 'lightgreen'
      }))
    ]),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ]),

]);
