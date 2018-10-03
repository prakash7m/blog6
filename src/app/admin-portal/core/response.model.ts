/**
 * The basic json response format that should include a success property and an optional mesasge.
 *
 * @export
 * @interface StandardResponse
 */
export interface StandardResponse {
  success: boolean;
  message?: string;
}

/**
 * The generic data response which has basic success and message property and a single data property
 * Mostly useful to return one model item from server
 *
 * @export
 * @interface DataResponse
 * @extends {StandardResponse}
 * @template D
 */
export interface DataResponse<D> extends StandardResponse {
  data: D;
}

/**
 * Additional optional properties of each rows which is merged to typed model
 *
 * @export
 * @interface Row
 */
export interface Row {
  link?: string;
}

/**
 * The generic rows response which has basic success and message property and a rows property to return list of items
 * Mostly useful to return list of models
 *
 * @export
 * @interface RowsResponse
 * @extends {StandardResponse}
 * @template R
 */
export interface RowsResponse<R> extends StandardResponse {
  rows: R[] & Row[];
}

/**
 * This is the generic error response that a service consumer will see if there will be any error.
 * This manages the error response in a generic way. Service will catch the error and transformed into
 * one of the generic error format for the consumer.
 *
 * @export
 * @interface HandledErrorResponse
 * @extends {StandardResponse}
 * @template ErrorType
 */
export interface HandledErrorResponse<ErrorType = any> extends StandardResponse {
  errors?: ErrorType[];
  statusCode: number;
  statusText: string;
}
