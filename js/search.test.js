/**
 * @jest-environment jsdom
 */

const { openPage, __resetSearchOptionsMap, globalActions } = require('./search.js');

describe('openPage function', () => {
  let originalNavigate;
  let navigateMock;

  beforeAll(() => {
    originalNavigate = globalActions.navigate;
    navigateMock = jest.fn();
    globalActions.navigate = navigateMock;
  });

  afterAll(() => {
    globalActions.navigate = originalNavigate;
  });

  beforeEach(() => {
    __resetSearchOptionsMap();
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
        <div id="search-error" class="search-error" role="alert" hidden>Page not found</div>
      </form>
    `;
  });

  it('shows error "Page not found" and does not navigate for an unmatched search', () => {
    document.getElementById('site-search').value = 'Nonexistent Page';
    openPage();
    const errorEl = document.getElementById('search-error');
    expect(errorEl.hidden).toBe(false);
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('navigates to the correct page for a case-insensitive match and hides error', () => {
    const errorEl = document.getElementById('search-error');
    // Ensure it starts visible to test it gets hidden
    errorEl.hidden = false;

    document.getElementById('site-search').value = 'Introduction';
    openPage();
    expect(navigateMock).toHaveBeenCalledWith('intro.html');
    expect(errorEl.hidden).toBe(true);

    navigateMock.mockClear();

    document.getElementById('site-search').value = 'eThiCal prinCiplEs';
    openPage();
    expect(navigateMock).toHaveBeenCalledWith('ethics.html');
    expect(errorEl.hidden).toBe(true);
  });
});
