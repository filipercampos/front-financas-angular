import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent implements OnInit {
  @Input('form-control')
  formControl: AbstractControl | null = new FormControl('');
  constructor() {}

  ngOnInit() {}

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    }
    return null;
  }

  private mustShowErrorMessage(): boolean {
    return (
      this.formControl == null ||
      (this.formControl!.invalid && this.formControl!.touched)
    );
  }

  private getErrorMessage(): string | null {
    const errors = this.formControl!.errors;
    console.error(errors);
    if (errors?.['required']) {
      return 'Campo obrigatório';
    } else if (errors?.['email']) {
      return 'Email inválido';
    } else if (errors?.['minlength']) {
      const requiredLength = errors?.['minlength'].requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    } else if (errors?.['maxlength']) {
      const requiredLength = errors?.['maxlength.requiredLength'];
      return `Máximo ${requiredLength} caracteres`;
    }
    return null;
  }
}
