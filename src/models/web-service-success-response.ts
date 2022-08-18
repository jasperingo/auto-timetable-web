export interface WebServiceSuccessResponse<T> {
  status: 200 | 201 | 204;
  data: T;
}
