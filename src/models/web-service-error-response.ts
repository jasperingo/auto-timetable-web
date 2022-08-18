export interface WebServiceValidationError {
  name: string;
  value: string;
  message: string;
}

export interface WebServiceBadRequestResponse {
  status: 400;
  errors: WebServiceValidationError[];
}

export interface WebserviceGenericErrorResponse {
  status: 401 | 403 | 404 | 500 | 503;
  error: string;
}

export type WebserviceErrorResponse =
  | WebserviceGenericErrorResponse
  | WebServiceBadRequestResponse;
