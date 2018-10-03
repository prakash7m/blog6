import { Injector, ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import storage from 'local-storage-fallback';
import { ActivatedRoute, Router } from '@angular/router';

import { HandledErrorResponse } from './response.model';

/**
 * The global error handler extending ErrorHandler.
 * All the services should catch the error and pass it to global error handler.
 * All the consumers then will get handled error response from here.
 *
 * @export
 * @class GlobalErrorHandler
 * @extends {ErrorHandler}
 */
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  defaultErrorObject: HandledErrorResponse = {
    success: false,
    message: 'Error occured !',
    statusCode: 400,
    statusText: 'Bad Request !'
  };

  /**
   * Creates an instance of GlobalErrorHandler.
   * @param {Injector} injector
   * @memberof GlobalErrorHandler
   */
  constructor(private injector: Injector) { super(); }

  /**
   * Method to be called by all services catch callback.
   * This will prepare a proper handled error response for the consumer
   *
   * @template ErrorType
   * @param {(Error | HttpErrorResponse)} errorResponse
   * @returns {Observable<HandledErrorResponse<ErrorType>>}
   * @memberof GlobalErrorHandler
   */
  handleError<ErrorType>(errorResponse: Error | HttpErrorResponse): Observable<HandledErrorResponse<ErrorType>> {
    console.log('Caught by global error handler');
    super.handleError(errorResponse);
    if (errorResponse instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return this.handleOffline(errorResponse);
      } else {
        return this.handleStatus<ErrorType>(errorResponse, errorResponse.status);
      }
    } else {
      return this.handleClient(errorResponse);
    }
  }

  /**
   * Create a handled error response for the case where browser is actually offline (no internet connection)
   *
   * @param {HttpErrorResponse} errorResponse
   * @returns {Observable<HandledErrorResponse>}
   * @memberof GlobalErrorHandler
   */
  handleOffline(errorResponse: HttpErrorResponse): Observable<HandledErrorResponse> {
    console.log(errorResponse);
    return ErrorObservable.create(this.defaultErrorObject);
  }

  /**
   * Creates a handled error response for the case when there is a status code from the server other than 200 ok.
   * Ex. 400 bad request, 401 unauthorized, 500 internal server error etc.
   *
   * @template ErrorType
   * @param {HttpErrorResponse} errorResponse
   * @param {number} status
   * @returns {Observable<HandledErrorResponse<ErrorType>>}
   * @memberof GlobalErrorHandler
   */
  handleStatus<ErrorType>(errorResponse: HttpErrorResponse, status: number): Observable<HandledErrorResponse<ErrorType>> {
    console.warn('Status Error Response');
    const route = this.injector.get(ActivatedRoute);
    if (status === 401) {
      const recentAuthState = storage.getItem('recent-auth-state');
      if (recentAuthState) {
        storage.setItem('recent-auth-state', '');
      }

      const router = this.injector.get(Router);
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login?r=' + window.location.pathname;
      }
    }
    const err: HandledErrorResponse<ErrorType> = {
      success: false,
      message: errorResponse.error.message || errorResponse.statusText,
      errors: errorResponse.error.errors,
      statusCode: errorResponse.status,
      statusText: errorResponse.statusText
    };
    return ErrorObservable.create(err);
  }

  /**
   * Create a handled error response for the client side javascript error case.
   *
   * @param {Error} error
   * @returns {Observable<HandledErrorResponse>}
   * @memberof GlobalErrorHandler
   */
  handleClient(error: Error): Observable<HandledErrorResponse> {
    console.warn('Client Error: ', error);
    return ErrorObservable.create(this.defaultErrorObject);
  }
}
