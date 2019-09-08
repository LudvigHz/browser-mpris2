describe('Version tests', () => {

    parameterized(
        'mayor, minor, patch should be valid numbers',
        [
            'vnumber.1.2',
            'v1.five.2',
            'v1.1.ten',
            'v1.1.2-snapshot',
            'beta-v1.1.2'
        ],
        (params) => {
            expect(function () {new Version(params)}).toThrow(new Error(`${params} is not a valid semantic version.`))
        }
    );

    parameterized(
        '$latest should be greater than $current',
        [
            {latest: 'v0.0.2', current: 'v0.0.1'},
            {latest: 'v0.0.10', current: 'v0.0.1'},
            {latest: 'v0.1.0', current: 'v0.0.1'},
            {latest: 'v0.1.5', current: 'v0.1.3'},
            {latest: 'v1.1.3', current: 'v1.1.1'},
            {latest: 'v100.300.200', current: 'v10.5000.4566233'},
        ],
        (params) => {
            const latest = new Version(params.latest),
                current = new Version(params.current);
            expect(latest.isGreaterThan(current)).toBe(true);
        });

    parameterized(
        '$latest should be lower than $current',
        [
            {latest: 'v0.3.10', current: 'v0.4.0'},
            {latest: 'v0.3.10', current: 'v4.4.0'},
        ],
        (params) => {
            const latest = new Version(params.latest),
                current = new Version(params.current);
            expect(latest.isGreaterThan(current)).toBe(false);
        });
});
