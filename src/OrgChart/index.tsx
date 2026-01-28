import React, { useLayoutEffect, useRef, type PropsWithChildren } from 'react';
import { OrgChart } from 'd3-org-chart';
import type { StatePublic } from '../types/orgchart'


type Props<D=any> = {
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

export function OrgChartComponent<D=any>(
	props: PropsWithChildren<Props<D>>
){
	const d3Container = useRef(null);
	const chartRef = useRef(new OrgChart<D>());

	// // @ts-ignore
	// function addNode(node) {
	// 	chartRef.current.addNode(node);
	// }

	// // @ts-ignore
	// props.setClick(addNode);

	// We need to manipulate DOM
	useLayoutEffect(() => {

		const {
			data,
		} = props

		if(data && d3Container.current) {
			chartRef.current
				.container(d3Container.current)
				// @ts-expect-error Annotation throuble
				.data(data)
				
			props.nodeId && chartRef.current.nodeId(props.nodeId)
			props.parentNodeId && chartRef.current.parentNodeId(props.parentNodeId)
			props.defs && chartRef.current.defs(props.defs)
			props.linkUpdate && chartRef.current.linkUpdate(props.linkUpdate)
			props.nodeUpdate && chartRef.current.nodeUpdate(props.nodeUpdate)
			props.nodeEnter && chartRef.current.nodeEnter(props.nodeEnter)
			props.nodeExit && chartRef.current.nodeExit(props.nodeExit)
			props.nodeWidth && chartRef.current.nodeWidth(props.nodeWidth)
			props.nodeHeight && chartRef.current.nodeHeight(props.nodeHeight)
			props.siblingsMargin && chartRef.current.siblingsMargin(props.siblingsMargin)
			props.childrenMargin && chartRef.current.childrenMargin(props.childrenMargin)
			props.neighbourMargin && chartRef.current.neighbourMargin(props.neighbourMargin)
			props.compactMarginPair && chartRef.current.compactMarginPair(props.compactMarginPair)
			props.compactMarginBetween && chartRef.current.compactMarginBetween(props.compactMarginBetween)
			props.nodeButtonWidth && chartRef.current.nodeButtonWidth(props.nodeButtonWidth)
			props.nodeButtonHeight && chartRef.current.nodeButtonHeight(props.nodeButtonHeight)
			props.nodeButtonX && chartRef.current.nodeButtonX(props.nodeButtonX)
			props.nodeButtonY && chartRef.current.nodeButtonY(props.nodeButtonY)
			props.pagingStep && chartRef.current.pagingStep(props.pagingStep)
			props.minPagingVisibleNodes && chartRef.current.minPagingVisibleNodes(props.minPagingVisibleNodes)
			props.createZoom && chartRef.current.createZoom(props.createZoom)
			props.onZoomStart && chartRef.current.onZoomStart(props.onZoomStart)
			props.onZoom && chartRef.current.onZoom(props.onZoom)
			props.onZoomEnd && chartRef.current.onZoomEnd(props.onZoomEnd)
			props.onNodeClick && chartRef.current.onNodeClick(props.onNodeClick)
			props.onExpandOrCollapse && chartRef.current.onExpandOrCollapse(props.onExpandOrCollapse)
			props.nodeContent && chartRef.current.nodeContent(props.nodeContent)
			props.buttonContent && chartRef.current.buttonContent(props.buttonContent)
			props.pagingButton && chartRef.current.pagingButton(props.pagingButton)


			typeof props.initialZoom !== undefined && chartRef.current.initialZoom(props.initialZoom as number)


			chartRef.current.render();
		}
	}, [ props, d3Container.current ]);

	return (
		<div>
			<div ref={d3Container} />
		</div>
	);
}