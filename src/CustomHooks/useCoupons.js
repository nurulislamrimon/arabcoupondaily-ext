import { useQuery } from '@tanstack/react-query'


const useCoupons = () => {
    const { isLoading, refetch, data, error } = useQuery(['nothing'], async () =>
        await fetch('http://localhost:5000/coupons')
            .then(res => res.json())
    )
    return { isLoading, refetch, data: data, error }
};


export default useCoupons;