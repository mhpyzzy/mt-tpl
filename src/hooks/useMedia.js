import { useMediaQuery } from '@vueuse/core'
export function useMedia(){
    const isMobile = useMediaQuery('(max-width: 768px)')
    return isMobile
}