import { GetAgePipe } from './age-management.pipe';

describe('GetAgePipe', () => {
    const pipe = new GetAgePipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('transforms birthDate into age', () => {
        expect(pipe.transform('1992-01-16')).toBe(29);
    });
});