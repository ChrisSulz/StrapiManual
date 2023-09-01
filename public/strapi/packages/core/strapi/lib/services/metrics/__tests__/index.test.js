'use strict';

jest.mock('node-fetch', () => jest.fn(() => Promise.resolve()));

const { get } = require('lodash/fp');
const metrics = require('../index');

const fetch = jest.fn(() => Promise.resolve());

describe('metrics', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  test('Initializes a middleware', () => {
    const use = jest.fn();

    const metricsInstance = metrics({
      config: {
        get(path) {
          return get(path, this);
        },
        uuid: 'test',
        environment: 'dev',
        info: {
          strapi: '0.0.0',
        },
      },
      server: {
        use,
      },
      dirs: {
        app: {
          root: process.cwd(),
        },
      },
      requestContext: {
        get: jest.fn(() => ({})),
      },
      fetch,
    });

    metricsInstance.register();

    expect(use).toHaveBeenCalled();

    metricsInstance.destroy();
  });

  test('Does not init middleware if disabled', () => {
    const use = jest.fn();

    const metricsInstance = metrics({
      config: {
        get(path) {
          return get(path, this);
        },
        uuid: false,
        environment: 'dev',
        info: {
          strapi: '0.0.0',
        },
      },
      server: {
        use,
      },
      dirs: {
        app: {
          root: process.cwd(),
        },
      },
      requestContext: {
        get: jest.fn(() => ({})),
      },
      fetch,
    });

    metricsInstance.register();

    expect(use).not.toHaveBeenCalled();

    metricsInstance.destroy();
  });

  test('Send payload with meta', () => {
    const { send } = metrics({
      config: {
        get(path) {
          return get(path, this);
        },
        uuid: 'test',
        environment: 'dev',
        info: {
          strapi: '0.0.0',
        },
      },
      server: {
        use() {},
      },
      dirs: {
        app: {
          root: process.cwd(),
        },
      },
      requestContext: {
        get: jest.fn(() => ({})),
      },
      fetch,
    });

    send('someEvent');

    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toBe('https://analytics.strapi.io/api/v2/track');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
      event: 'someEvent',
      groupProperties: {
        projectType: 'Community',
        projectId: 'test',
      },
    });
    expect(fetch.mock.calls[0][1].headers).toMatchObject({
      'Content-Type': 'application/json',
      'X-Strapi-Event': 'someEvent',
    });

    fetch.mockClear();
  });

  test('Does not send payload when disabled', () => {
    const { send } = metrics({
      config: {
        get(path) {
          return get(path, this);
        },
        uuid: false,
        packageJsonStrapi: {},
        environment: 'dev',
        info: {
          strapi: '0.0.0',
        },
      },
      server: {
        use() {},
      },
      dirs: {
        app: {
          root: process.cwd(),
        },
      },
      requestContext: {
        get: jest.fn(() => ({})),
      },
      fetch,
    });

    send('someEvent');

    expect(fetch).not.toHaveBeenCalled();
  });
});
