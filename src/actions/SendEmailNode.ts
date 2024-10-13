import {TreeNode} from "../TreeNode";

/**
 * Node representing a "Send Email" action in the decision tree.
 */
export class SendEmailNode extends TreeNode {
    private sender: string;
    private receiver: string;

    constructor(sender: string, receiver: string) {
        super();
        this.sender = sender;
        this.receiver = receiver;
    }

    performAction(): void {
        console.log(`Sending email from ${this.sender} to ${this.receiver}`);
    }

    static fromJSON(json: any): SendEmailNode {
        return new SendEmailNode(json.sender, json.receiver);
    }
}

TreeNode.registerAction('SendEmail', SendEmailNode.fromJSON);

