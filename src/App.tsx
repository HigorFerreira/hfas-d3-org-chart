import { useMemo, useRef } from 'react'
import { tree, walkMap } from './data'

import { OrgChartComponent } from './OrgChart'

function useTjData(){
	const data = useMemo(() => {
		const data: unknown[] = []
		walkMap(tree, node => {
			data.push({
				id: node.key,
				name: node.title,
				positionName: "",
				parentId: node.parent??"",
				area: "",
				// @ts-ignore
				level: node.data.level??"",
				imageUrl: "https://yt3.googleusercontent.com/ytc/AIdro_mF6P7igvGdOnKAntulNIZ8mD3gQcLtrbC1_K_BXSjJPQ=s900-c-k-c0x00ffffff-no-rj",
			})
			return node
		})

		// @ts-ignore
		return data.sort((a, b) => a.level - b.level)
	}, [])

	return [ data, false ] as const
}

function App() {
	const ref = useRef<HTMLDivElement>(null)
	const [ data, isLoading ] = useTjData()

	return <div style={{
		width: 'calc(100vw - 120px)',
		height: 'calc(100vh - 120px)',
		border: '1px dashed',
		overflow: 'hidden'
	}}>
		{
			isLoading
				? <div>Carregando...</div>
				: <OrgChartComponent<{ name: string; imageUrl: string; width: number; positionName: string }>
					// @ts-expect-error Annotation
					data={data}
					nodeWidth={d => 250}
					initialZoom={0.7}
					nodeHeight={(d) => 175}
					childrenMargin={(d) => 40}
					compactMarginBetween={(d) => 15}
					compactMarginPair={(d) => 80}
					nodeContent={(d, i, arr, state) => {
						return `
							<div style="padding-top:30px;background-color:none;margin-left:1px;height:${
									d.height
									}px;border-radius:2px;overflow:visible">
									<div style="height:${
										d.height - 32
									}px;padding-top:0px;background-color:white;border:1px solid lightgray;">

										<img src=" ${
										d.data.imageUrl
										}" style="margin-top:-30px;margin-left:${d.data.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
									
									<div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
										d.data.width - 2
									}px;border-radius:1px"></div>

									<div style="padding:20px; padding-top:35px;text-align:center">
										<div style="color:#111672;font-size:16px;font-weight:bold"> ${
											d.data.name
										} </div>
										<div style="color:#404040;font-size:16px;margin-top:4px"> ${
											d.data.positionName
										} </div>
									</div>
									</div>     
							</div>
						`
					}}
				/>
		}
	</div>
}

export default App
