export function hasValues<T>(instance: Iterable<T>, values: T[]) {
    const callList = values.map((value) => [value]);
    const mock = jest.fn();
    for (let v of instance) {
        mock(v);
    }
    expect(mock.mock.calls).toEqual(callList);
}
