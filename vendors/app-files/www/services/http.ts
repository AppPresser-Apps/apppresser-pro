import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

/**
 * HTTP GET request
 * 
 * @param options HttpOptions
 * @returns HttpResponse
 */
export const get = async (options: HttpOptions) => {

  const response: HttpResponse = await CapacitorHttp.get(options);

  return response;
};
  
/**
 * HTTP POST request
 * 
 * @param options HttpOptions
 * @returns HttpResponse
 */
export const post = async (options: HttpOptions) => {
  // const options = {
  //   url: 'https://example.com/my/api',
  //   headers: { 'X-Fake-Header': 'Fake-Value' },
  //   data: { foo: 'bar' },
  // };

  const response: HttpResponse = await CapacitorHttp.post(options);

  return response;
};