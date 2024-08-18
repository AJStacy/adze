import { afterEach, describe, expect, test, vi } from 'vitest';
import adze, { Middleware, setup, TargetEnvironment, teardown } from '../src';

/**
 * @vitest-environment node
 */

describe('middleware', () => {
  afterEach(() => {
    teardown();
  });

  test('fires the loadNodeDependencies method for loading dependencies when in a node environment', () => {
    console.log = vi.fn();
    const funcBrowser = vi.fn();
    const funcNode = vi.fn();

    class TestMiddleware extends Middleware {
      protected async loadBrowserDependencies(): Promise<void> {
        funcBrowser();
      }
      protected async loadNodeDependencies(): Promise<void> {
        funcNode();
      }
    }
    setup({
      middleware: [new TestMiddleware()],
    });

    adze.log('Test log.');
    expect(console.log).toHaveBeenCalled();
    expect(funcNode).toHaveBeenCalledTimes(1);
    expect(funcBrowser).not.toHaveBeenCalled();
  });

  test("doesn't fire loadNodeDependencies when running in node when the target environment is browser", async () => {
    console.log = vi.fn();
    const funcBrowser = vi.fn();
    const funcNode = vi.fn();

    class TestMiddleware extends Middleware {
      constructor() {
        super('browser');
      }

      protected async loadBrowserDependencies(): Promise<void> {
        funcBrowser();
      }
      protected async loadNodeDependencies(): Promise<void> {
        funcNode();
      }
    }
    const testMiddleware = new TestMiddleware();
    await testMiddleware.load();
    setup({
      middleware: [testMiddleware],
    });

    adze.log('Test log.');
    expect(console.log).toHaveBeenCalled();
    expect(funcNode).not.toHaveBeenCalled();
    expect(funcBrowser).not.toHaveBeenCalled();
  });
});
