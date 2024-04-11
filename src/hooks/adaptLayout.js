
import { useResizeObserver } from '@vueuse/core'
import { adaptLayout } from '@/config/index'

export function useAdaptLayout(){
    if(adaptLayout === 'pc') return;

    if(adaptLayout === 'h5') {
        useResizeObserver(document.documentElement, (entries) => {
            const entry = entries[0]
            const { width } = entry.contentRect
            document.documentElement.style.fontSize = 16 * (width / 375) + 'px';
        })
        return
    }
    if(adaptLayout === 'auto') {
        useResizeObserver(document.documentElement, (entries) => {
            const entry = entries[0]
            const { width } = entry.contentRect
            if(width > 640) {
                document.documentElement.style.fontSize = '';
                return
            }
            document.documentElement.style.fontSize = 16 * (width / 375) + 'px';
        })
        return
    }
}
