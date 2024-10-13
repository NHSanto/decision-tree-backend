import {TreeNode} from "../TreeNode";

/**
 * Node representing a conditional (if-else) action in the decision tree.
 */
export class ConditionNode extends TreeNode {
    private condition: string;
    private trueAction: TreeNode | null;
    private falseAction: TreeNode | null;

    constructor(condition: string, trueAction: TreeNode | null, falseAction: TreeNode | null) {
        super();
        this.condition = condition;
        this.trueAction = trueAction;
        this.falseAction = falseAction;
    }

    performAction(): void {
        const conditionResult = eval(this.condition);
        console.log(`Evaluating condition: ${this.condition}, result: ${conditionResult}`);

        if (conditionResult && this.trueAction) {
            this.trueAction.execute();
        } else if (!conditionResult && this.falseAction) {
            this.falseAction.execute();
        }
    }

    static fromJSON(json: any): ConditionNode {
        const trueAction = json.trueAction ? TreeNode.fromJSON(json.trueAction) : null;
        const falseAction = json.falseAction ? TreeNode.fromJSON(json.falseAction) : null;
        return new ConditionNode(json.condition, trueAction, falseAction);
    }
}

TreeNode.registerAction('Condition', ConditionNode.fromJSON);

