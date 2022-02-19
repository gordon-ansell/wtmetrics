import { BaseCalc, WtCalculatorError } from './baseCalc';

/**
 * McGlothin 1RM calculator.
 */
export default class McGlothinCalc extends BaseCalc
{
    /**
     * Constructor.
     * 
     * @param   {object}    opts        Data options.
     * @param   {object}    defs        Calc definitions.
     * 
     * @return  {BaseCalc}
     */
    constructor(opts, defs = null)
    {
        super(opts, defs);
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
        if (!this.checkOpts(['reps'])) {
            throw new WtCalculatorError(`${this.gc()} calculation does not have required options (multi).`);
        }

        if (1 === this.opts.reps) {
            return 1;
        }

        return (101.3 - (2.67123 * this.opts.reps));
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

        if (!this.checkOpts(['liftedWeight'])) {
            throw new WtCalculatorError(`${this.gc()} calculation does not have required options.`);
        }

        let mult = this.calcMult();
        return {val: (this.opts.liftedWeight * 100) / mult, _mult: 1 / (mult / this.opts.liftedWeight)};
    }

}