import { InvalidUuidError, Uuid } from "../uuid.vo";
import {validate as uuidValidade} from 'uuid';

const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

describe('Uuid Unit Tests', () => {
    test('should create a valid UUID', () => {
        expect(() => {
            new Uuid('invalid-uuid');

        }).toThrow(new InvalidUuidError);

        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a valid UUID', () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidade(uuid.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);

    });

    test('should accept a valid UUID', () => {
        const uuid = new Uuid('f47ac10b-58cc-4372-a567-0e02b2c3d479');
        expect(uuid.id).toBe('f47ac10b-58cc-4372-a567-0e02b2c3d479');
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
});