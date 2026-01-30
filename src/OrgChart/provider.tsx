import { createContext, useMemo, type PropsWithChildren } from 'react';
import type { ContextType } from './types'
import { OrgChart } from 'd3-org-chart';

export const Context = createContext<ContextType>({
    chart: null
})

export function Provider<Datum=any>({ children }: PropsWithChildren){

    const chart = useMemo(() => {
        if(typeof window !== 'undefined'){
            return new OrgChart<Datum>
        }
        return null
    }, [])

    return <Context value={{ chart }}>
        { children }
    </Context>
}