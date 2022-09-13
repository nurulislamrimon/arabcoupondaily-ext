import { useQuery } from '@tanstack/react-query'


const useCoupons = () => {
    const { isLoading, refetch, data, error } = useQuery(['nothing'], async () =>
        await fetch('https://arabcoupondaily-ext.herokuapp.com/coupons')
            .then(res => res.json())
    )
    return { isLoading, refetch, data: data, error }
};


export default useCoupons;