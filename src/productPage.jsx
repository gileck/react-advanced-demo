const CommentSection = React.lazy(() => import('./CommentSection'));

function ProductPage({ productId }) {
    const [commentsData, setCommentsData] = useState(null);
    useEffect(() => {
        async function fetchComments() {
            // fetch comments ...
            setCommentsData(result.comments)
        }

        fetchComments();
    }, [productId]);

    return (
        <div>
            <h1>Product Page for {productId}</h1>

            {hasComments ? (
                <Suspense fallback={<div>Loading comments...</div>}>
                    <CommentSection comments={commentsData} />
                </Suspense>
            ) : (
                <p>No comments available for this product.</p>
            )}
        </div>
    );
}
