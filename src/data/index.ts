import { type TreeDataNode } from './types'

export { tree } from './data'


export function walkMap<T = any>(node: TreeDataNode[], callback: (node: TreeDataNode) => T): T[] {
    return node.map(n => {
        const children: T[] | null = !n.children ? null : walkMap(n.children, callback)

        return callback(
            // @ts-expect-error Annotation throuble
            !children
                ? n
                : { ...n, children }
        )
    })
}