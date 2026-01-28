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
				: <OrgChartComponent
					data={data}
				/>
		}
	</div>
}

export default App
