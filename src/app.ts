import express from 'express';
import {TreeNode} from "./TreeNode";
import {ConditionNode} from "./actions/ConditionNode";
import {SendEmailNode} from "./actions/SendEmailNode";
import {SendSMSNode} from "./actions/SendSmsNode";
import {registerActionsFromEnv} from "./RegisterActionsFromEnv";

registerActionsFromEnv();

const executeTree = (jsonTree: any) => {
    try {
        const decisionTree = TreeNode.fromJSON(jsonTree);
        decisionTree.execute();
        console.log('Tree executed successfully');
    } catch (error: any) {
        console.error(`Error executing tree: ${error.message}`);
    }
};

// Example of executing with the three provided JSON parameters

const testInput1 = {
    "type": "SendEmail",
    "sender": "sender@example.com",
    "receiver": "receiver@example.com",
    "nextAction": {
        "type": "SendSMS",
        "phoneNumber": "1234567890",
        "nextAction": {
            "type": "SendEmail",
            "sender": "sender@example.com",
            "receiver": "receiver@example.com"
        }
    }
};

const testInput2 = {
    "type": "Loop",
    "iterations": 3,
    "subtree": {
        "type": "Condition",
        "condition": "Math.random() > 0.5",
        "trueAction": {
            "type": "SendSMS",
            "phoneNumber": "1234567890"
        },
        "falseAction": null,
        "nextAction": {
            "type": "SendEmail",
            "sender": "nahiddddddd@example.com",
            "receiver": "receiver@example.com"
        }
    },
    "nextAction": {
        "type": "SendEmail",
        "sender": "appleeeeee@example.com",
        "receiver": "receiver@example.com"
    }
};

const testInput3 = {
    "type": "SendEmail",
    "sender": "appleee@example.com",
    "receiver": "receiver@example.com",
    "nextAction": {
        "type": "SendSMS",
        "phoneNumber": "1234567890",
        "message": "Happy Christmas!",
        "nextAction": {
            "type": "Condition",
            "condition": "'2024' === '2024'",
            "trueAction": {
                "type": "SendSMS",
                "phoneNumber": "1234567890",
                "message": "Happy Christmas!"
            },
            "falseAction": null
        }
    }
};

// Call the function with different parameters for testing
executeTree(testInput1);
executeTree(testInput2);
executeTree(testInput3);
