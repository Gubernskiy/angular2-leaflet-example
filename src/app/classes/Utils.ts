export class Utils {
    /**
     * mixin parametrs oj objects
     * @param mixTo
     * @param mixFrom
     */
    static mixin(mixTo: Object, mixFrom: Object) {
        for (let key in mixFrom) {
            mixTo[key] = mixFrom[key];
        }
    }
}
