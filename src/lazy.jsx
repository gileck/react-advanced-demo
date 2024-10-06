const CollapsedComponent = React.lazy(() => import('./CollapsedComponent'));

function CollapsibleSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <h2>
                Information Section
                <ExpandMoreIcon onClick={handleToggle} />
            </h2>

            {isExpanded && (
                <Suspense fallback={<div>Loading content...</div>}>
                    <CollapsedComponent />
                </Suspense>
            )}
        </div>
    );
} 