'use strict';

jest.mock('../../../src/venmo/shared/browser-detection');

const browserDetection = require('../../../src/venmo/shared/browser-detection');
const { isBrowserSupported } = require('../../../src/venmo/shared/supports-venmo');

describe('isBrowserSupported', () => {
  beforeEach(() => {
    jest.spyOn(browserDetection, 'isIosSafari').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isIosWebview').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isIos').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isChrome').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isAndroid').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isAndroidWebview').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isSamsungBrowser').mockReturnValue(false);
    jest.spyOn(browserDetection, 'isMobileFirefox').mockReturnValue(false);
  });

  it('returns true for iOS Safari', () => {
    browserDetection.isIosSafari.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns true for iOS Safari when webviews are dissallowed', () => {
    browserDetection.isIosSafari.mockReturnValue(true);

    expect(isBrowserSupported({
      allowWebviews: false
    })).toBe(true);
  });

  it('returns true for iOS webview', () => {
    browserDetection.isIosSafari.mockReturnValue(true);
    browserDetection.isIosWebview.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns false for iOS webview when configured to dissallow webviews', () => {
    browserDetection.isIosSafari.mockReturnValue(true);
    browserDetection.isIosWebview.mockReturnValue(true);

    expect(isBrowserSupported({
      allowWebviews: false
    })).toBe(false);
  });

  it('returns true for iOS Chrome', () => {
    browserDetection.isIos.mockReturnValue(true);
    browserDetection.isChrome.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns true for Android Chrome', () => {
    browserDetection.isAndroid.mockReturnValue(true);
    browserDetection.isChrome.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns true for Android webview', () => {
    browserDetection.isAndroid.mockReturnValue(true);
    browserDetection.isChrome.mockReturnValue(true);
    browserDetection.isAndroidWebview.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns false for Android webview when configured', () => {
    browserDetection.isAndroid.mockReturnValue(true);
    browserDetection.isChrome.mockReturnValue(true);
    browserDetection.isAndroidWebview.mockReturnValue(true);

    expect(isBrowserSupported({
      allowWebviews: false
    })).toBe(false);
  });

  it('returns true for Samsung Browser', () => {
    browserDetection.isSamsungBrowser.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns true for Mobile Firefox', () => {
    browserDetection.isMobileFirefox.mockReturnValue(true);

    expect(isBrowserSupported()).toBe(true);
  });

  it('returns false for other browsers', () => {
    browserDetection.isIosSafari.mockReturnValue(false);
    browserDetection.isChrome.mockReturnValue(false);
    browserDetection.isSamsungBrowser.mockReturnValue(false);
    browserDetection.isMobileFirefox.mockReturnValue(false);

    expect(isBrowserSupported()).toBe(false);
  });

  describe('when allowNewBrowserTab is false', () => {
    it('returns false for iOS Chrome', () => {
      browserDetection.isIos.mockReturnValue(true);
      browserDetection.isChrome.mockReturnValue(true);

      expect(isBrowserSupported({
        allowNewBrowserTab: false
      })).toBe(false);
    });

    it('returns false for Mobile Firefox', () => {
      browserDetection.isMobileFirefox.mockReturnValue(true);

      expect(isBrowserSupported({
        allowNewBrowserTab: false
      })).toBe(false);
    });
  });
});

