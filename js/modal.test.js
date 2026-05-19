const fs = require('fs');
const path = require('path');
const modalJs = fs.readFileSync(path.resolve(__dirname, './modal.js'), 'utf8');

describe('modal.js', () => {
  let domContentLoadedHandler;

  beforeEach(() => {
    jest.resetModules();
    global.document = {
      getElementById: jest.fn(),
      addEventListener: jest.fn((event, handler) => {
        if (event === 'DOMContentLoaded') {
          domContentLoadedHandler = handler;
        }
      }),
    };
    global.window = {
        location: { href: '' }
    };
    global.Date = class extends Date {
        constructor() {
            super('2025-01-01');
        }
        getFullYear() {
            return 2025;
        }
    };
  });

  test('should update copyright year even if modal elements are missing', () => {
    const copyrightYearElement = { textContent: '2023' };
    global.document.getElementById.mockImplementation((id) => {
      if (id === 'copyright-year') return copyrightYearElement;
      return null; // Missing modal elements
    });

    // Execute the script
    eval(modalJs);

    // Trigger DOMContentLoaded
    if (domContentLoadedHandler) {
      domContentLoadedHandler();
    }

    expect(copyrightYearElement.textContent).toBe(2025);
  });

  test('should setup modal event listeners when all elements are present', () => {
    const elements = {
      'contactBtn': { addEventListener: jest.fn(), focus: jest.fn() },
      'contactModal': { hidden: true },
      'modalOverlay': { hidden: true, addEventListener: jest.fn() },
      'closeModal': { addEventListener: jest.fn(), focus: jest.fn() },
      'copyright-year': { textContent: '2023' }
    };

    global.document.getElementById.mockImplementation((id) => elements[id]);

    eval(modalJs);
    if (domContentLoadedHandler) {
      domContentLoadedHandler();
    }

    expect(elements['contactBtn'].addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(elements['closeModal'].addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(elements['modalOverlay'].addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(elements['copyright-year'].textContent).toBe(2025);

    // Test openModal
    const openModal = elements['contactBtn'].addEventListener.mock.calls[0][1];
    openModal();
    expect(elements['modalOverlay'].hidden).toBe(false);
    expect(elements['contactModal'].hidden).toBe(false);
    expect(elements['closeModal'].focus).toHaveBeenCalled();

    // Test closeModal
    const closeModal = elements['closeModal'].addEventListener.mock.calls[0][1];
    closeModal();
    expect(elements['modalOverlay'].hidden).toBe(true);
    expect(elements['contactModal'].hidden).toBe(true);
    expect(elements['contactBtn'].focus).toHaveBeenCalled();
  });
});
