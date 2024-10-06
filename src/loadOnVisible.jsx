const ComponentUnderFold = React.lazy(() => import('./ComponentUnderFold'));

function createIntersectionPromise(ref) {
    return new Promise((resolve) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    resolve();
                    observer.disconnect();
                }
            });
        });
        observer.observe(ref.current);
    });
}


function ViewerportEnterWrapper({ children }) {
    const ref = React.useRef();
    use(createIntersectionPromise(ref))
    return children
}

export function Main({ }) {

    return (
        <Suspense>
            <ViewerportEnterWrapper>
                <ComponentUnderFold />
            </ViewerportEnterWrapper>
        </Suspense>
    );
}
