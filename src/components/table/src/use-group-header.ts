import { CSSProperties, ComputedRef, computed } from 'vue'
// import { DataTableSetupProps } from './DataTable'
// import type {
//   TableExpandColumn,
//   TableSelectionColumn,
//   TableColumn,
//   TableBaseColumn,
//   any,
// } from './interface'
// import { getColKey, createCustomWidthStyle } from './utils'

export interface RowItem {
  colSpan: number
  rowSpan: number
  column: any
  isLast: boolean
}
export interface ColItem {
  key: string | number
  style: CSSProperties
  column: any
}

function getColKey (col: any): string | number {
  if (col.type === 'selection') return '__n_selection__'
  if (col.type === 'expand') return '__n_expand__'
  return col.key
}

export function createCustomWidthStyle (
  column: any,
): CSSProperties {
  return {
    width: 300,
  }
}

type RowItemMap = WeakMap<any, RowItem>
function getRowsAndCols (columns: any): {
  hasEllpisis: boolean
  rows: RowItem[][]
  cols: ColItem[]
  dataRelatedCols: Array<any>
} {
  const rows: RowItem[][] = []
  const cols: ColItem[] = []
  const dataRelatedCols: Array<any> = []
  const rowItemMap: RowItemMap = new WeakMap()
  let maxDepth = -1
  let totalRowSpan = 0
  let hasEllpisis = false
  function ensureMaxDepth (columns: any, currentDepth: number): void {
    if (currentDepth > maxDepth) {
      rows[currentDepth] = []
      maxDepth = currentDepth
    }
    for (const column of columns) {
      if ('children' in column) {
        ensureMaxDepth(column.children, currentDepth + 1)
      } else {
        cols.push({
          key: getColKey(column),
          style: createCustomWidthStyle(column),
          column,
        })
        totalRowSpan += 1
        hasEllpisis = !!column.ellipsis
        dataRelatedCols.push(column)
      }
    }
  }
  ensureMaxDepth(columns, 0)
  function ensureColLayout (
    columns: any,
    currentDepth: number,
    parentIsLast: boolean,
  ): void {
    let currentLeafIndex = -1
    let hideUntilIndex = 0
    const lastIndex = columns.length - 1
    columns.forEach((column, index) => {
      if ('children' in column) {
        // do not allow colSpan > 1 for non-leaf th
        const isLast = parentIsLast && index === lastIndex
        const rowItem: RowItem = {
          column,
          colSpan: 0,
          rowSpan: 1,
          isLast,
        }
        ensureColLayout(column.children, currentDepth + 1, isLast)
        column.children.forEach(childColumn => {
          rowItem.colSpan += rowItemMap.get(childColumn)?.colSpan ?? 0
        })
        rowItemMap.set(column, rowItem)
        rows[currentDepth].push(rowItem)
      } else {
        currentLeafIndex += 1
        if (currentLeafIndex < hideUntilIndex) {
          return
        }
        let colSpan = 1
        if ('titleColSpan' in column) {
          colSpan = column.titleColSpan ?? 1
        }
        if (colSpan > 1) {
          hideUntilIndex = currentLeafIndex + colSpan
        }
        const isLast = currentLeafIndex + colSpan === totalRowSpan
        const rowItem: RowItem = {
          column,
          colSpan: colSpan,
          rowSpan: maxDepth - currentDepth + 1,
          isLast,
        }
        rowItemMap.set(column, rowItem)
        rows[currentDepth].push(rowItem)
      }
    })
  }
  ensureColLayout(columns, 0, true)

  return {
    hasEllpisis,
    rows,
    cols,
    dataRelatedCols,
  }
}

export function useGroupHeader (columns): {
  rowsRef: ComputedRef<RowItem[][]>
  colsRef: ComputedRef<ColItem[]>
  hasEllpisisRef: ComputedRef<boolean>
  dataRelatedColsRef: ComputedRef<
  Array<any>
  >
} {
  const rowsAndCols = computed(() => getRowsAndCols(columns))
  return {
    rowsRef: computed(() => rowsAndCols.value.rows),
    colsRef: computed(() => rowsAndCols.value.cols),
    hasEllpisisRef: computed(() => rowsAndCols.value.hasEllpisis),
    dataRelatedColsRef: computed(() => rowsAndCols.value.dataRelatedCols),
  }
}
