import React, { useLayoutEffect, useRef, type PropsWithChildren } from 'react';
import { OrgChart } from 'd3-org-chart';
import type { StatePublic } from '../types/orgchart'


type Props<D=any> = {
	data?: D
	nodeContent?: StatePublic<D>['nodeContent']
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
			nodeContent
		} = props

		if(data && d3Container.current) {
			chartRef.current
				.container(d3Container.current)
				// @ts-expect-error Annotation throuble
				.data(data)
				.nodeWidth((d) => 250)
				.initialZoom(0.7)
				.nodeHeight((d) => 175)
				.childrenMargin((d) => 40)
				.compactMarginBetween((d) => 15)
				.compactMarginPair((d) => 80)
				
			nodeContent && chartRef.current.nodeContent(nodeContent)
			chartRef.current.render();
		}
	}, [ props, d3Container.current ]);

	return (
		<div>
			<div ref={d3Container} />
		</div>
	);
}