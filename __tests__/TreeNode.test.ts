

// Mock the actions to avoid actually sending emails or SMS
import {TreeNode} from "../src/TreeNode";
import {SendEmailNode} from "../src/actions/SendEmailNode";
import {SendSMSNode} from "../src/actions/SendSmsNode";
import {ConditionNode} from "../src/actions/ConditionNode";
import {LoopNode} from "../src/actions/LoopNode";

jest.spyOn(global.console, 'log').mockImplementation(() => {});

describe('TreeNode tests', () => {
    beforeAll(() => {
        // Register actions
        TreeNode.registerAction('SendEmail', SendEmailNode.fromJSON);
        TreeNode.registerAction('SendSMS', SendSMSNode.fromJSON);
        TreeNode.registerAction('Condition', ConditionNode.fromJSON);
        TreeNode.registerAction('Loop', LoopNode.fromJSON);
    });

    test('SendEmailNode should log correct message', () => {
        const json = {
            type: 'SendEmail',
            sender: 'sender@example.com',
            receiver: 'receiver@example.com',
        };

        const node = TreeNode.fromJSON(json);
        node.execute();

        expect(console.log).toHaveBeenCalledWith('Sending email from sender@example.com to receiver@example.com');
    });

    test('SendSMSNode should log correct message', () => {
        const json = {
            type: 'SendSMS',
            phoneNumber: '1234567890',
        };

        const node = TreeNode.fromJSON(json);
        node.execute();

        expect(console.log).toHaveBeenCalledWith('Sending SMS to 1234567890');
    });

    test('ConditionNode should execute trueAction when condition is true', () => {
        const json = {
            type: 'Condition',
            condition: '1 + 1 === 2',
            trueAction: {
                type: 'SendSMS',
                phoneNumber: '1234567890',
            },
            falseAction: {
                type: 'SendEmail',
                sender: 'sender@example.com',
                receiver: 'receiver@example.com',
            },
        };

        const node = TreeNode.fromJSON(json);
        node.execute();

        // Since condition is true, it should trigger the trueAction (SendSMS)
        expect(console.log).toHaveBeenCalledWith('Sending SMS to 1234567890');
        expect(console.log).not.toHaveBeenCalledWith('Not Sending email from sender@example.com to receiver@example.com');
    });

    test('LoopNode should execute the subtree multiple times', () => {
        const json = {
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

        const node = TreeNode.fromJSON(json);
        node.execute();

        // The loop should run 3 times, sending the same email
        expect(console.log).toHaveBeenCalledWith('Sending email from sender@example.com to receiver@example.com');
        expect(console.log).toHaveBeenCalledWith('Sending SMS to 1234567890');
        expect(console.log).toHaveBeenCalledWith('Evaluating condition: 1 + 1 === 2, result: true');
    });
});
