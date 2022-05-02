import renderer from 'react-test-renderer';

const isNull = (val) => {
    return val === null;
};

/**
 * Find out whether type of value is undefined
 * @param  {any} val to be validated
 * @returns {boolean} true if value is null, else false
 */
const isUndefined = (val) => {
    return typeof val === 'undefined';
};

/**
 * Find out whether value is null or undefined, therefore "missing"
 * @param  {any} val to be validated
 * @returns {boolean} true if value is null or undefined, else false
 */
const isMissing = (val) => {
    return isNull(val) || isUndefined(val);
};

const isPresent = (val) => {
    return !isMissing(val);
};

const isObject = (val) => {
    return isPresent(val) && typeof val === 'object' && !isArray(val);
};

const mockSetState = Component => class extends Component {
    setState(f, callback) {
        if (typeof f === 'function') {
            this.state = { ...this.state, ...f(this.state) };
        } else {
            this.state = { ...this.state, ...f };
        }
        if (isFunction(callback)) callback();
    }
};

const assertSnapshot = (C, config) => {
    /**
     * @param props: (Object) Override props in component
     * @param state: (Object) Override states in component
     * @param throws: Expect an error throws when unit test run
     * @param beforeTest: (function) run a function before each case
     * @param statics: (Object) Override global variables in component
     * @param desc: (String) Add description of running test
     */
    const { props, state, desc, throws, beforeTest, statics } = config;

    let Component;
    let RenderedComponent;

    if (beforeTest) {
        beforeTest();
    }

    if (throws) {
        test(desc, () => {
            expect(() => {
                if (C.prototype.render) {
                    Component = new C(props);
                } else {
                    Component = C(props);
                }
            }).toThrow(throws);
        });
    } else {
        if (C.prototype.render) {
            const CWithMockState = mockSetState(C);
            Component = new CWithMockState(props);

            if (state) {
                Component.setState(state);
            }

            if (statics && isObject(statics)) {
                const keys = Object.keys(statics);
                keys.forEach((value) => {
                    Component[value] = statics[value];
                });
            }

            RenderedComponent = Component.render();
        } else {
            RenderedComponent = C(props);
        }

        test(desc, () => {
            const tree = RenderedComponent && renderer
                .create(RenderedComponent)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    }
};

const assertSnapshots = (Component, configs) => {
    configs.forEach(config => assertSnapshot(Component, config));
    // @TODO decide whether we are going to make
    // the assertion here, or file-by-file basis.
    // if (Component.gql) assertGql(Component);
};

export { assertSnapshots };
export default { assertSnapshots };
