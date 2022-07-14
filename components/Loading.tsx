
interface PropsLoading {
    className?: string
    children?: JSX.Element
};

const Loading = ({
    className,
    children
}: PropsLoading) => {
    return (
        <div className={`loading ${className}`}>
            {children}
        </div>
    )
}

export default Loading;
