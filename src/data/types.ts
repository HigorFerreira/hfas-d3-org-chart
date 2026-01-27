import type { TreeDataNode as AntdTreeDataNode } from 'antd'

export interface TreeDataNode<T=unknown> extends Partial<Omit<AntdTreeDataNode, "key" | "children">> {
    key: string
    parent?: TreeDataNode<T> | string
    children?: TreeDataNode<T>[]
    data?: T
}