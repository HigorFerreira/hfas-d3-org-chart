import React, { useLayoutEffect, useRef, type PropsWithChildren } from 'react';
import { OrgChart } from 'd3-org-chart';

type Props<D=any> = {
	data?: D
}

export function OrgChartComponent<D=any>(
	{
		data
	}: PropsWithChildren<Props<D>>
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
				.nodeContent(
					function(d, i, arr, state) {
						return `
						<div style="padding-top:30px;background-color:none;margin-left:1px;height:${
								d.height
								}px;border-radius:2px;overflow:visible">
								<div style="height:${
									d.height - 32
								}px;padding-top:0px;background-color:white;border:1px solid lightgray;">

									<img src=" ${
										// @ts-ignore
									d.data.imageUrl
									// @ts-ignore
									}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
								
								<div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
									// @ts-ignore
									d.width - 2
								}px;border-radius:1px"></div>

								<div style="padding:20px; padding-top:35px;text-align:center">
									<div style="color:#111672;font-size:16px;font-weight:bold"> ${
										// @ts-ignore
										d.data.name
									} </div>
									<div style="color:#404040;font-size:16px;margin-top:4px"> ${
										// @ts-ignore
										d.data.positionName
									} </div>
								</div>
								</div>     
						</div>
						`
					}
				)
				.render();
		}
	}, [ data, d3Container.current ]);

	return (
		<div>
			<div ref={d3Container} />
		</div>
	);
}