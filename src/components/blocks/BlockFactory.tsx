import { json } from "stream/consumers";
import BaseBlock from "./BaseBlock";
import TextBlock from "./impl/TextBlock";

interface APIBlock {
    id: string
    kind: string
    values: any
    columnIndex: number
    rowIndex: number
}

export function toJson(blocks: BaseBlock[][]) {
    let jsonBlocks = [];
    for (let col = 0; col < blocks.length; col++) {
        const blockList = blocks[col];
        for (let row = 0; row < blockList.length; row++) {
            const block = blockList[row];
            jsonBlocks.push({
                id: block.id,
                columnIndex: col,
                rowIndex: row,
                kind: block.getType(),
                values: block.getValues()
            })
        }
    }
    return jsonBlocks;
}

export function newBlock(block: APIBlock): BaseBlock | null {

    let baseBlock: BaseBlock;

    const { id, kind } = block;

    if (kind.toLowerCase() === "text") {
        const { text, type } = block.values;
        baseBlock = new TextBlock(text, type, !Boolean(id));
        if (id) baseBlock.setId(id);
        return baseBlock;
    }

    return null;
}

export function generateMatrixBlocks(blocks: APIBlock[]): BaseBlock[][] {
    let matrix: BaseBlock[][] = createColumns([], getMaxColumnIndex(blocks));

    for (const block of blocks) {
        const baseBlock = newBlock(block);
        if (!baseBlock) continue;
        const { columnIndex, rowIndex } = block;

        matrix[columnIndex][rowIndex] = baseBlock;
    }

    return replaceNullBlocks(matrix);
}

const replaceNullBlocks = (matrix: BaseBlock[][]) => {
    for (const blockList of matrix) {
        for (let i = 0; i < blockList.length; i++) {
            if (!blockList[i])
                blockList[i] = new TextBlock("", "h2", true);
        }
    }
    return matrix;
}

const getMaxColumnIndex = (blocks: APIBlock[]): number => {
    let max: number = 0;
    for (const block of blocks) {
        if (block.columnIndex > max)
            max = block.columnIndex;
    }
    return max;
}

const createColumns = (matrix: any[][], columnIndex: number) => {
    for (let i = 0; i < columnIndex + 1; i++) {
        if (!matrix.at(i))
            matrix[i] = [];
    }
    return matrix;
}

const arrayInsert = (arr: any[], index: number, newItem: any) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]