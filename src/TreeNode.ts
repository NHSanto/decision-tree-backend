type NodeFactory = (json: any) => TreeNode;

/**
 * Abstract base class for all decision tree nodes.
 * Provides a registry for dynamically adding new node types.
 */
export abstract class TreeNode {
    nextAction?: TreeNode;

    static fromJSON(json: any): TreeNode {
        const factory = this.registry[json.type];
        if (!factory) {
            throw new Error(`Unknown action type: ${json.type}`);
        }

        const node = factory(json);

        // Parse the `nextAction` recursively if it exists
        if (json.nextAction) {
            node.nextAction = this.fromJSON(json.nextAction);
        }

        return node;
    }

    // After executing the current node, check for `nextAction`
    execute(): void {
        this.performAction();
        if (this.nextAction) {
            this.nextAction.execute();
        }
    }

    // Each action node will define this
    abstract performAction(): void;

    static registry: { [type: string]: (json: any) => TreeNode } = {};

    static registerAction(type: string, factory: (json: any) => TreeNode) {
        this.registry[type] = factory;
    }
}
