'use client'
import React, { createContext, useContext, useLayoutEffect, useRef, type PropsWithChildren } from 'react';
import { OrgChart } from 'd3-org-chart'
import type { Props } from './types'

type ContextType<D=any> = {
	chart: React.RefObject<OrgChart<D>> | null
}

const Context = createContext<ContextType>({
	chart: null
})

export function useChart<D=any>(){
	const { chart } = useContext(Context)

	return chart as unknown as ContextType<D>
}

export function OrgChartComponent<D=any>(
	props: PropsWithChildren<Props<D>>
){
	const d3Container = useRef(null);
	const chartRef = useRef(new OrgChart<D>());

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

	// @ts-expect-error Annotation
	return <Context value={{ chart: chartRef.current }}>
		<div ref={d3Container} />
	</Context>
}