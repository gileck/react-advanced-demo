import React, { Suspense, useEffect, useRef } from 'react';
import { createPromise, use } from './use.js';
const isServer = typeof window === 'undefined';
const ComponentUnderFold = React.lazy(() => import('./ComponentUnderFold.jsx'))

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
        if (ref.current) {
            observer.observe(ref.current);
        }
    });
}

function ViewportEnterWrapper({ children, useApi }) {
    useApi.read()
    return children
}

function DownloadOnViewportWrapper({ children }) {
    const ref = useRef();
    const { promise: viewportPromise, resolve: viewportResolver } = createPromise();
    const useApi = use(isServer ? Promise.resolve() : viewportPromise)
    useEffect(() => {
        createIntersectionPromise(ref).then(viewportResolver)
    }, [ref])

    return <div ref={ref}>
        <Suspense fallback={''}>
            <ViewportEnterWrapper wrapperRef={ref} useApi={useApi}>
                {children}
            </ViewportEnterWrapper>
        </Suspense>
    </div>
}

export default function Main() {
    return (
        <>
            <div>
                <div style={{ height: '200vh' }}></div>
            </div>
            <DownloadOnViewportWrapper>
                <ComponentUnderFold />
            </DownloadOnViewportWrapper>
        </>

    );
}
