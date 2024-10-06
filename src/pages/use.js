export function use(promise) {

    let status = 'pending';
    let result;
    let suspender = promise.then(
        (r) => {
            console.log('resolved');
            status = 'success';
            result = r;
        },
        (e) => {
            status = 'error';
            result = e;
        }
    );
    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        },
    };
}

export function createPromise() {
    let resolve;
    let reject;
    let promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}