import React from "react";

export function useDebounce<I>(value: I, delay?: number) {
    const [debounceValue, setDebounceValue] = React.useState<I>(value)

    React.useEffect(() => {
        const handle = setTimeout(() => {
            setDebounceValue(value)
        }, delay || 500)

        return () => {
            clearTimeout(handle)
        }
    }, [value, delay])

    return debounceValue
}