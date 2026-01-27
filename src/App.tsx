import { useEffect, useEffectEvent, useMemo, useRef, useState, useTransition } from 'react'
import { tree, walkMap } from './data'
import './App.css'

import { OrgChart } from 'd3-org-chart'
import * as d3 from 'd3'

function useTjData(){
	const data = useMemo(() => {
		const data: unknown[] = []
		walkMap(tree, node => {
			data.push({
				id: node.key,
				name: node.title,
				positionName: "",
				parentId: node.parent??"",
				imageUrl: "",
				area: "",
				// @ts-ignore
				level: node.data.level??""
			})
			return node
		})

		// @ts-ignore
		return data.sort((a, b) => a.level - b.level)
	}, [])

	return [ data, false ] as const
}

function useCsvData<D=unknown, E=unknown>(url: string) {
	const [ data, setData ] = useState<D>()
	const [ error, setError ] = useState<D>()
	const [ isLoading, startTransition ] = useTransition()

	useEffect(() => {
		startTransition(async () => {
			try {
				// @ts-expect-error Annotation throuble
				setData(await d3.csv(url))
			}
			catch(e){
				// @ts-expect-error Annotation throuble
				setError(e)
			}
		})
	}, [])

	return [ data, isLoading, error ] as const
}

function App() {
	const ref = useRef<HTMLDivElement>(null)
	
	const [ data, isLoading ] = useTjData()
	// const [ data, isLoading ] = useCsvData('https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv')

	useEffect(() => console.log({ data }), [ data ])

	useEffect(() => {
		if(!isLoading){
			const chart = new OrgChart()
				// @ts-ignore
				.container(ref.current)
				// @ts-ignore
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

								<div style="margin-right:10px;margin-top:15px;float:right">${
									// @ts-ignore
									d.data.id
								}</div>
								
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
								<div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
									<div > Manages:  ${
										// @ts-ignore
										d.data._directSubordinates
									} 👤</div>  
									<div > Oversees: ${
										// @ts-ignore
										d.data._totalSubordinates
									} 👤</div>    
								</div>
								</div>     
						</div>
						`
					}
				)
				.render()
		}

	}, [ ref, isLoading ])

	return (
		<>
			{
				isLoading
					? <div>Carrregando...</div>
					: <div
						ref={ref}
						style={{
							width: 1200,
							height: 800,
							border: '2px dashed',
							overflow: 'hidden'
						}}
					>

					</div>
			}
		</>
	)
}

export default App
