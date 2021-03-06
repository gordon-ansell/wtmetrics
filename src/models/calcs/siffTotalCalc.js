/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
import { BaseAgeCalc } from './baseAgeCalc';
import { WtCalculatorError } from './baseCalc';

// Default Siff coefficients.
const SIFF_DEFS = {
    squat:  [638.01, 9517.7, -0.7911],
    bench:  [408.15, 11047, -0.9371],
    dead:   [433.14, 493825, -1.9712],
    total:  [1270.4, 172970, -1.3925]
};

/**
 * Siff(total) calculator.
 */
export default class SiffTotalCalc extends BaseAgeCalc
{
    /**
     * Siff definitions.
     * @member {object}
     */
    siffDefs = {};

    /**
     * The specifiv Siff value we're after.
     * @member {string}
     */
    subVal = 'total';

    /**
     * Constructor.
     * 
     * @param   {object}    opts        Data options.
     * @param   {object}    defs        Calc definitions.
     * 
     * @return  {SiffTotalCalc}
     */
    constructor(opts, defs = null)
    {
        super(opts, defs);
        this.siffDefs = (defs && defs.siff) ? defs.siff : SIFF_DEFS; 
    }


    /**
     * Calculate multiplier.
     * 
     * @return  {float}
     * 
     * @throws  {WtCalculatorError}     If we don't have required options.
     */
    calcMult()
    {
        if (!this.checkOpts(['bodyWeight'])) {
            throw new WtCalculatorError(`Siff (${this.subVal}) calculation does not have required options (multi).`);
        }

        let s = this.siffDefs[this.subVal];

        let mult = s[0] - s[1] * this.opts.bodyWeight ** s[2]

        return mult;
    }

    /**
     * Calculate.
     * 
     * @return  {object}
     * 
     * @throws  {WtCalculatorError}     If we don't have required options.
     */
    calc()
    {
        if ('total' === this.subVal) {
            if (!this.checkOpts(['liftedWeight'])) {
                throw new WtCalculatorError(`Siff calculation does not have required options (for ${this.subVal}).`);
            }
        } else {
            if (!this.checkOpts([this.subVal + 'Weight'])) {
                throw new WtCalculatorError(`Siff calculation does not have required options (for ${this.subVal}).`);
            }
        }

        let f = ('total' === this.subVal) ? this.opts.liftedWeight : this.opts[this.subVal + 'Weight'];

        let mult = this.calcMult();
        return {val: (f / mult) * 100, 'b/w': (100 / mult)};
    }

}