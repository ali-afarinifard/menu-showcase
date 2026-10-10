import { describe, expect, it } from 'vitest';
import { calculateTotals } from './data';
describe('Demo cart totals', () => {
  it('calculates an empty order', () => { expect(calculateTotals({})).toEqual({ subtotal: 0, tax: 0, total: 0 }); });
  it('calculates quantities and rounded tax', () => { expect(calculateTotals({ toast: 2, pancakes: 1 })).toEqual({ subtotal: 425000, tax: 42500, total: 467500 }); });
  it('ignores unknown item IDs', () => { expect(calculateTotals({ unknown: 10 })).toEqual({ subtotal: 0, tax: 0, total: 0 }); });
});