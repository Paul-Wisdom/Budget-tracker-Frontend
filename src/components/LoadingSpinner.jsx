const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-white">
            <div className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
        </div>
    )
}

export default LoadingSpinner;