/**
 * @jest-environment jsdom
 */

const { openPage, __resetSearchOptionsMap, globalActions } = require('./search.js');

describe('openPage function', () => {
  let originalAlert;
  let originalNavigate;
  let navigateMock;

  beforeAll(() => {
    originalAlert = window.alert;
    window.alert = jest.fn();

    originalNavigate = globalActions.navigate;
    navigateMock = jest.fn();
    globalActions.navigate = navigateMock;
  });

  afterAll(() => {
    window.alert = originalAlert;
    globalActions.navigate = originalNavigate;
  });

  beforeEach(() => {
    __resetSearchOptionsMap();
    window.alert.mockClear();
    navigateMock.mockClear();

    document.body.innerHTML = `
      <form onsubmit="openPage(); return false;">
        <label for="site-search">Search the site:</label>
        <input type="search" id="site-search" list="search-options" placeholder="Search pages" />
        <datalist id="search-options">
          <option data-href="intro.html" value="Introduction"></option>
          <option data-href="ethics.html" value="Ethical Principles"></option>
        </datalist>
        <button type="submit">Go</button>
      </form>
    `;
  });

  it('alerts "Page not found" and does not navigate for an unmatched search', () => {
    document.getElementById('site-search').value = 'Nonexistent Page';
    openPage();
    expect(window.alert).toHaveBeenCalledWith('Page not found');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('navigates to the correct page for a case-insensitive match', () => {
    document.getElementById('site-search').value = 'Introduction';
    openPage();
    expect(navigateMock).toHaveBeenCalledWith('intro.html');
    expect(window.alert).not.toHaveBeenCalled();

    navigateMock.mockClear();

    document.getElementById('site-search').value = 'eThiCal prinCiplEs';
    openPage();
    expect(navigateMock).toHaveBeenCalledWith('ethics.html');
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('throws an error if the search-options element is missing', () => {
    document.getElementById('search-options').remove();
    expect(() => openPage()).toThrow(TypeError);
  });
});
