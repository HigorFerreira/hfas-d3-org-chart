import { OrgChart } from 'd3-org-chart';
import type { StatePublic } from '../types/orgchart'

export type ContextType<D=any> = {
    chart: OrgChart<D> | null
}

export type Props<D=any> = {
    data?: D
    nodeId?: StatePublic<D>['nodeId']
    parentNodeId?: StatePublic<D>['parentNodeId']
    defs?: StatePublic<D>['defs']
    linkUpdate?: StatePublic<D>['linkUpdate']
    nodeUpdate?: StatePublic<D>['nodeUpdate']
    nodeEnter?: StatePublic<D>['nodeEnter']
    nodeExit?: StatePublic<D>['nodeExit']
    nodeWidth?: StatePublic<D>['nodeWidth']
    nodeHeight?: StatePublic<D>['nodeHeight']
    siblingsMargin?: StatePublic<D>['siblingsMargin']
    childrenMargin?: StatePublic<D>['childrenMargin']
    neighbourMargin?: StatePublic<D>['neighbourMargin']
    compactMarginPair?: StatePublic<D>['compactMarginPair']
    compactMarginBetween?: StatePublic<D>['compactMarginBetween']
    nodeButtonWidth?: StatePublic<D>['nodeButtonWidth']
    nodeButtonHeight?: StatePublic<D>['nodeButtonHeight']
    nodeButtonX?: StatePublic<D>['nodeButtonX']
    nodeButtonY?: StatePublic<D>['nodeButtonY']
    pagingStep?: StatePublic<D>['pagingStep']
    minPagingVisibleNodes?: StatePublic<D>['minPagingVisibleNodes']
    createZoom?: StatePublic<D>['createZoom']
    onZoomStart?: StatePublic<D>['onZoomStart']
    onZoom?: StatePublic<D>['onZoom']
    onZoomEnd?: StatePublic<D>['onZoomEnd']
    onNodeClick?: StatePublic<D>['onNodeClick']
    onExpandOrCollapse?: StatePublic<D>['onExpandOrCollapse']
    nodeContent?: StatePublic<D>['nodeContent']
    buttonContent?: StatePublic<D>['buttonContent']
    pagingButton?: StatePublic<D>['pagingButton']

    initialZoom?: Parameters<OrgChart<D>['initialZoom']>['0']
}