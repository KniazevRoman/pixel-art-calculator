export function checkForOverflow(output) {
    if (output.toString().length >= 10) {
        try {
            return +output.toFixed(10-Math.round(output).toString().length);
        } catch {
            return Number.parseFloat(output).toExponential(2);
        }
    } else {
        return +output;
    }
}