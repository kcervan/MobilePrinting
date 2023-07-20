import { LightningElement } from 'lwc';
import WorkOrderFileViewer from 'c/workOrderFileViewer';

// Mock the lightning-file-card component
jest.mock(
    'lightning/fileCard',
    () => ({
        __esModule: true,
        default: jest.fn()
    }),
    { virtual: true }
);

describe('c-work-order-file-viewer', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('renders the file viewer', () => {
        // Arrange
        const element = createElement('c-work-order-file-viewer', { is: WorkOrderFileViewer });
        document.body.appendChild(element);

        // Assert
        expect(element).toBeTruthy();
    });
});
