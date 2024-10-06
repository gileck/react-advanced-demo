export default function ComponentUnderFold() {
    console.log("ComponentUnderFold");
    return (
        <div>
            <h1>Component Under Fold</h1>
            <p> This component is lazy loaded when it is in the viewport </p>
        </div>
    )
}