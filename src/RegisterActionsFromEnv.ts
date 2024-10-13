// Register the action node types with the factory
import {TreeNode} from "./TreeNode";
import {SendSMSNode} from "./actions/SendSmsNode";
import {SendEmailNode} from "./actions/SendEmailNode";
import {ConditionNode} from "./actions/ConditionNode";
import {LoopNode} from "./actions/LoopNode";
import dotenv from 'dotenv';
dotenv.config();

// Action mapping
const actionMap: { [key: string]: any } = {
    'SendEmail': SendEmailNode,
    'SendSMS': SendSMSNode,
    'Condition': ConditionNode,
    'Loop': LoopNode
};

export const registerActionsFromEnv = () => {
    const actionsToRegister = process.env.ACTIONS?.split(',') || [];
    actionsToRegister.forEach(action => {
        const actionClass = actionMap[action.trim()];
        if (actionClass) {
            TreeNode.registerAction(action, actionClass.fromJSON);
            console.log(`Registered action: ${action}`);
        } else {
            console.error(`No class found for action: ${action}`);
        }
    });
};