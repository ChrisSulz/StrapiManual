import { AxiosError } from 'axios';

import { auth } from '../auth';
import {
  reqInterceptor,
  reqErrorInterceptor,
  resInterceptor,
  resErrorInterceptor,
  fetchClient,
  addInterceptors,
} from '../fetchClient';

const token = 'coolToken';
auth.getToken = jest.fn().mockReturnValue(token);
auth.clearAppStorage = jest.fn().mockReturnValue(token);

describe('HELPER-PLUGIN | utils | fetchClient', () => {
  describe('Default config', () => {
    it('should contain a paramsSerializer that can serialize a params object to a string', () => {
      const mockParams = {
        page: '1',
        pageSize: '10',
        sort: 'short_text:ASC',
        filters: {
          $and: [
            {
              biginteger: {
                $eq: '3',
              },
            },
            {
              short_text: {
                $eq: 'test',
              },
            },
          ],
        },
        locale: 'en',
      };

      const apiInstance = fetchClient({
        baseUrl: 'http://strapi',
      });
      const serializedParams = apiInstance.defaults.paramsSerializer(mockParams);

      expect(serializedParams).toBe(
        'page=1&pageSize=10&sort=short_text:ASC&filters[$and][0][biginteger][$eq]=3&filters[$and][1][short_text][$eq]=test&locale=en'
      );
    });
  });
  describe('Test the interceptors', () => {
    it('API request should add authorization token to header', async () => {
      const apiInstance = fetchClient({
        baseUrl: 'http://strapi',
      });

      const result = await apiInstance.interceptors.request.handlers[0].fulfilled({ headers: {} });

      expect(result.headers.Authorization).toContain(`Bearer ${token}`);
      expect(apiInstance.interceptors.response.handlers[0].fulfilled('foo')).toBe('foo');
    });

    describe('Test the addInterceptor function', () => {
      afterEach(() => {
        // restore the spy created with spyOn
        jest.clearAllMocks();
      });

      it('should add a response interceptor to the fetchClient instance', () => {
        const apiInstance = fetchClient({
          baseUrl: 'http://strapi-test',
        });

        const spyReq = jest.spyOn(apiInstance.interceptors.request, 'use');
        const spyRes = jest.spyOn(apiInstance.interceptors.response, 'use');
        addInterceptors(apiInstance);

        expect(spyReq).toHaveBeenCalled();
        expect(spyRes).toHaveBeenCalled();
      });
    });
  });

  describe('Test the interceptors callbacks', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });
    });

    afterAll(() => {
      Object.defineProperty(window, 'location', { configurable: true, value: window.location });
    });

    it('should return the config object passed with the correct headers the request interceptor callback on success', async () => {
      const configMock = {
        headers: {
          common: { Accept: 'application/json, text/plain, */*' },
          delete: {},
          get: {},
          head: {},
          post: { 'Content-Type': 'application/x-www-form-urlencoded' },
          put: { 'Content-Type': 'application/x-www-form-urlencoded' },
          patch: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
        method: 'get',
        url: '/test',
      };

      const configResponse = await reqInterceptor(configMock);

      expect(configResponse.headers.Authorization).toBe(`Bearer ${token}`);
    });
  });

  it('should throw an error when the request interceptor error callback is called', () => {
    expect(reqErrorInterceptor('test')).rejects.toBe('test');
    expect(reqErrorInterceptor(new Error('test error'))).rejects.toThrow(new Error('test error'));
  });

  it('should return the response when the result interceptor callback is called', () => {
    const response = {
      msg: 'I am a response',
    };

    expect(resInterceptor(response).msg).toBe('I am a response');
  });

  it('should trigger the auth clearAppStorage and the window.location.reload when the result interceptor error callback is called', () => {
    const error = new AxiosError('Unauthorized');
    error.config = {};
    error.request = {};
    error.response = {
      data: { data: null, error: [Object] },
      status: 401,
      statusText: 'Unauthorized',
    };

    jest.spyOn(window.location, 'reload');

    try {
      resErrorInterceptor(error);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(auth.clearAppStorage).toHaveBeenCalledTimes(1);
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    }
  });
});
