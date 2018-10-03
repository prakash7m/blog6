
import {filter,  take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';

export class FormBase<T> implements OnInit {
  editingItem$: Observable<T>;
  formGroup: FormGroup;
  editMode: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.listenForEdit();
  }
  /**
   * Listens for the route parameter and if id is present, loads the form for id.
   * Implement the loadForm method in the inheriting component
   *
   * @memberof FormBase
   */
  listenForEdit() {
    this.route.params.pipe(
      filter(params => {
        if (!params.id) {
          this.editMode = null;
          this.initCreateForm();
        }
        return params.id;
      }))
      .subscribe(params => {
        this.initEditForm();
        this.editMode = params.id;
        this.loadForm(params.id, params);
        this.editingItem$.pipe(
          filter(item => !!item))
          .pipe(take(1))
          .subscribe((item: T) => {
            this.formGroup.patchValue(item);
          });
      });
  }

  /**
   * Interface method to be implemented by the inheriting component.
   * Dispatch the respective action to load the form data
   *
   * @param {string} id
   * @param {*} [params]
   * @memberof FormBase
   */
  loadForm(id: string, params?: any) {
    console.log('Not implemented');
  }

  /**
   * Interface method to be implemented by the inheriting component.
   * Initialize with the create form
   *
   * @memberof FormBase
   */
  initCreateForm() {
    console.log('Not implemented');
  }

  /**
   * Interface method to be implemented by the inheriting component.
   * Initialize with the edit form
   *
   * @memberof FormBase
   */
  initEditForm() {
    console.log('Not implemented');
  }

  submitEditForm() {
    console.log('Not implemented');
  }

  submitCreateForm() {
    console.log('Not implemented');
  }

  /**
   * Validates all form fields recursively
   * This method is useful calling before submitting the form
   *
   * @param {FormGroup} formGroup
   * @memberof FormBase
   */
  validateAllFormFields(formGroup: FormGroup) {         // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
      const control = formGroup.get(field);             // {3}
      if (control instanceof FormControl) {             // {4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        // {5}
        this.validateAllFormFields(control);            // {6}
      }
    });
  }

  /**
   * This checks if a particular form field is invalid
   * This method is useful in the templates to check if a form field is invalid to show error message
   *
   * @param {string} field
   * @returns
   * @memberof FormBase
   */
  isFieldInvalid(field: string) {
    return !this.formGroup.get(field).valid && this.formGroup.get(field).touched;
  }

  /**
   * Generic sumbit form. If this does not fullfil the requirement, override this method on the component.
   *
   * @returns
   * @memberof FormBase
   */
  submitForm() {
    if (!this.formGroup.valid) {
      this.validateAllFormFields(this.formGroup);
      return false;
    }
    this.editMode ? this.submitEditForm() : this.submitCreateForm();
  }
}
