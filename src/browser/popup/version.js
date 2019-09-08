/**
 * @property {number} mayor
 * @property {number} minor
 * @property {number} patch
 */
class Version {
    /**
     *
     * @param {string} version :: a semver valid string. ie: v1.0.1
     */
    constructor(version) {
        [this.mayor, this.minor, this.patch] =
            version.replace('v', '')
                .split('.')
                .map(n => {
                    n = Number(n);
                    if (isNaN(n))
                        throw new Error(`${version} is not a valid semantic version.`);
                    return n;
                });
    }

    /**
     *
     * @param {Version} other
     * @return {boolean}
     */
    isGreaterThan(other) {
        if (this.mayor !== other.mayor)
            return this.mayor > other.mayor;
        else if (this.minor !== other.minor)
            return this.minor > other.minor;
        else
            return this.patch > other.patch;
    }

}
