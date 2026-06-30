/**
 * @jest-environment node
 */
describe('modal logic', () => {
  let mockDocument;
  let mockWindow;
  let elements;
  let domContentLoadedCallback;
  const originalDate = global.Date;

  beforeEach(() => {
    jest.resetModules();
    elements = {
      contactBtn: {
        id: 'contactBtn',
        addEventListener: jest.fn((event, cb) => {
          if (event === 'click') elements.contactBtn.click = cb;
        }),
        focus: jest.fn()
      },
      contactModal: { id: 'contactModal', hidden: true },
      modalOverlay: {
        id: 'modalOverlay',
        hidden: true,
        addEventListener: jest.fn((event, cb) => {
          if (event === 'click') elements.modalOverlay.click = cb;
        })
      },
      closeModal: {
        id: 'closeModal',
        addEventListener: jest.fn((event, cb) => {
          if (event === 'click') elements.closeModal.click = cb;
        }),
        focus: jest.fn()
      },
      'copyright-year': { textContent: '' }
    };

    mockDocument = {
      getElementById: jest.fn((id) => elements[id]),
      addEventListener: jest.fn((event, cb) => {
        if (event === 'DOMContentLoaded') domContentLoadedCallback = cb;
      })
    };

    mockWindow = {
      document: mockDocument,
      Event: function(type) { this.type = type; }
    };

    global.document = mockDocument;
    global.window = mockWindow;

    const mockDate = new Date('2024-01-01');
    global.Date = class extends originalDate {
      constructor() { return mockDate; }
      static now() { return mockDate.getTime(); }
    };
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    global.Date = originalDate;
  });

  test('should initialize and update copyright year', () => {
    require('./modal.js');
    domContentLoadedCallback();

    expect(mockDocument.getElementById).toHaveBeenCalledWith('copyright-year');
    expect(elements['copyright-year'].textContent).toBe(2024);
  });

  test('should open and close modal', () => {
    require('./modal.js');
    domContentLoadedCallback();

    // Open
    elements.contactBtn.click();
    expect(elements.contactModal.hidden).toBe(false);
    expect(elements.modalOverlay.hidden).toBe(false);
    expect(elements.closeModal.focus).toHaveBeenCalled();

    // Close via close button
    elements.closeModal.click();
    expect(elements.contactModal.hidden).toBe(true);
    expect(elements.modalOverlay.hidden).toBe(true);
    expect(elements.contactBtn.focus).toHaveBeenCalled();

    // Open again
    elements.contactBtn.click();

    // Close via overlay
    elements.modalOverlay.click();
    expect(elements.contactModal.hidden).toBe(true);
    expect(elements.modalOverlay.hidden).toBe(true);
    expect(elements.contactBtn.focus).toHaveBeenCalled();
  });

  test('should not crash if elements are missing', () => {
    mockDocument.getElementById.mockReturnValue(null);
    require('./modal.js');
    expect(() => domContentLoadedCallback()).not.toThrow();
  });

  test('should not crash if only copyright-year is missing', () => {
    mockDocument.getElementById.mockImplementation((id) => {
      if (id === 'copyright-year') return null;
      return elements[id];
    });
    require('./modal.js');
    expect(() => domContentLoadedCallback()).not.toThrow();
  });

  test.each([
    'contactBtn',
    'contactModal',
    'modalOverlay',
    'closeModal'
  ])('should not crash if %s element is missing', (missingElementId) => {
    mockDocument.getElementById.mockImplementation((id) => {
      if (id === missingElementId) return null;
      return elements[id];
    });
    require('./modal.js');
    expect(() => domContentLoadedCallback()).not.toThrow();
  });
});
