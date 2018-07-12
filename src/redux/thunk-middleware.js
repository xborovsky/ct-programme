export function thunkMiddleware(store) {
    return function(next) {
        return function(action) {
            if (typeof action === "function") {
                return action(store.dispatch, store.getState);
            } else {
                return next(action);
            }
        }
    }
}