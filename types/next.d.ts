import * as DndSortable from '@dnd-kit/sortable'

declare module '@dnd-kit/sortable' {
    DndSortable
    declare function arrayMove<T>(array: readonly T[], from: number, to: number): readonly T[]; 
}