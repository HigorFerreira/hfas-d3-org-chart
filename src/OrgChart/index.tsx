import { useEffect, useLayoutEffect, useRef, type PropsWithChildren } from 'react';
import type { Props } from './types'
import { useChart } from './hooks'

export function OrgChartComponent<D=any>(
	props: PropsWithChildren<Props<D>>
){
	const chart = useChart();
	const d3Container = useRef(null);

	useLayoutEffect(() => {

		const {
			data,
		} = props;

		if(chart && data && d3Container.current) {

			// @ts-expect-error Annotation throuble
			chart.container(d3Container.current).data(data)
				
			props.nodeId && chart.nodeId(props.nodeId)
			props.parentNodeId && chart.parentNodeId(props.parentNodeId)
			props.defs && chart.defs(props.defs)
			props.linkUpdate && chart.linkUpdate(props.linkUpdate)
			props.nodeUpdate && chart.nodeUpdate(props.nodeUpdate)
			props.nodeEnter && chart.nodeEnter(props.nodeEnter)
			props.nodeExit && chart.nodeExit(props.nodeExit)
			props.nodeWidth && chart.nodeWidth(props.nodeWidth)
			props.nodeHeight && chart.nodeHeight(props.nodeHeight)
			props.siblingsMargin && chart.siblingsMargin(props.siblingsMargin)
			props.childrenMargin && chart.childrenMargin(props.childrenMargin)
			props.neighbourMargin && chart.neighbourMargin(props.neighbourMargin)
			props.compactMarginPair && chart.compactMarginPair(props.compactMarginPair)
			props.compactMarginBetween && chart.compactMarginBetween(props.compactMarginBetween)
			props.nodeButtonWidth && chart.nodeButtonWidth(props.nodeButtonWidth)
			props.nodeButtonHeight && chart.nodeButtonHeight(props.nodeButtonHeight)
			props.nodeButtonX && chart.nodeButtonX(props.nodeButtonX)
			props.nodeButtonY && chart.nodeButtonY(props.nodeButtonY)
			props.pagingStep && chart.pagingStep(props.pagingStep)
			props.minPagingVisibleNodes && chart.minPagingVisibleNodes(props.minPagingVisibleNodes)
			props.createZoom && chart.createZoom(props.createZoom)
			props.onZoomStart && chart.onZoomStart(props.onZoomStart)
			props.onZoom && chart.onZoom(props.onZoom)
			props.onZoomEnd && chart.onZoomEnd(props.onZoomEnd)
			props.onNodeClick && chart.onNodeClick(props.onNodeClick)
			props.onExpandOrCollapse && chart.onExpandOrCollapse(props.onExpandOrCollapse)
			props.nodeContent && chart.nodeContent(props.nodeContent)
			props.buttonContent && chart.buttonContent(props.buttonContent)
			props.pagingButton && chart.pagingButton(props.pagingButton)


			typeof props.initialZoom !== undefined && chart.initialZoom(props.initialZoom as number)


			chart.render();
		}

	}, [ props, chart, d3Container.current ]);

	useEffect(() => console.log({ chart }), [ chart ])


	return <div>
		<div ref={d3Container} />
	</div>
}