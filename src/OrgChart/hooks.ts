import { useContext } from 'react';
import { Context } from './provider'
import type { OrgChart } from 'd3-org-chart';

export function useChart<D=any>(){
    const { chart } = useContext(Context)

    return chart as unknown as OrgChart<D>
}