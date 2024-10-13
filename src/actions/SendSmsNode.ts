import {TreeNode} from "../TreeNode";

/**
 * Node representing a "Send SMS" action in the decision tree.
 */
export class SendSMSNode extends TreeNode {
    private phoneNumber: string;

    constructor(phoneNumber: string) {
        super();
        this.phoneNumber = phoneNumber;
    }

    performAction(): void {
        console.log(`Sending SMS to ${this.phoneNumber}`);
    }

    static fromJSON(json: any): SendSMSNode {
        return new SendSMSNode(json.phoneNumber);
    }
}

TreeNode.registerAction('SendSMS', SendSMSNode.fromJSON);
