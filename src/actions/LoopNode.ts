import {TreeNode} from "../TreeNode";

export class LoopNode extends TreeNode {
    private iterations: number;
    private subtree: TreeNode | null;

    constructor(iterations: number, subtree: TreeNode | null) {
        super();
        this.iterations = iterations;
        this.subtree = subtree;
    }

    performAction(): void {
        // console.log(`Looping ${this.iterations} times`);
        for (let i = 0; i < this.iterations; i++) {
            if (this.subtree) {
                console.log(`Iteration ${i + 1}`);
                this.subtree.execute();
            }
        }
    }

    static fromJSON(json: any): LoopNode {
        const subtree = json.subtree ? TreeNode.fromJSON(json.subtree) : null;
        return new LoopNode(json.iterations, subtree);
    }
}

TreeNode.registerAction('Loop', LoopNode.fromJSON);


