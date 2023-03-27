import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent {
  private _toastr = inject(ToastrService);

  cardList: Card[] = [
    { owner: 'Lucas', number: 4513256858760869, expiration: '25/12', cvv: 123 },
    {
      owner: 'Martin',
      number: 4513256858760810,
      expiration: '10/01',
      cvv: 124,
    },
    { owner: 'Ana', number: 4513256858760811, expiration: '31/12', cvv: 125 },
  ];

  formCard = new FormGroup({
    owner: new FormControl('', Validators.required),
    number: new FormControl(null, Validators.required),
    expiration: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
      Validators.minLength(5),
    ]),
    cvv: new FormControl(null, [
      Validators.required,
      Validators.maxLength(3),
      Validators.minLength(3),
    ]),
  });

  createCard() {
    if (this.formCard.invalid) {
      this.formCard.markAllAsTouched();
      return;
    }

    const newCard = {
      ...this.formCard.value,
    } as any as Card;

    this.cardList.push(newCard);
    this.formCard.reset();
    this._toastr.success('La lista fue actualizada', 'Tarjeta creada', {
      positionClass: 'toast-bottom-right',
    });
  }

  deleteCard(index: number) {
    this.cardList.splice(index, 1);
    this._toastr.success('Lista actualizada', 'Tarjeta eliminada', {
      positionClass: 'toast-bottom-right',
    });
  }
}

// ngx-toastr, bootstrap, font awesome
