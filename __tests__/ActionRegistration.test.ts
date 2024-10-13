import { TreeNode } from '../src/TreeNode';
import {SendSMSNode} from "../src/actions/SendSmsNode";
import {SendEmailNode} from "../src/actions/SendEmailNode";
describe('Action Registration', () => {
    beforeAll(() => {
        // Registering actions manually
        TreeNode.registerAction('SendEmail', SendEmailNode.fromJSON);
        TreeNode.registerAction('SendSMS', SendSMSNode.fromJSON);
    });

    test('should throw error for unregistered action', () => {
        const json = {
            type: 'UnknownAction'
        };

        expect(() => TreeNode.fromJSON(json)).toThrow('Unknown action type: UnknownAction');
    });

    test('should register and execute SendEmail action', () => {
        const json = {
            type: 'SendEmail',
            sender: 'sender@example.com',
            receiver: 'receiver@example.com'
        };

        const node = TreeNode.fromJSON(json);
        expect(node).toBeInstanceOf(SendEmailNode);
    });

    test('should register and execute SendSMS action', () => {
        const json = {
            type: 'SendSMS',
            phoneNumber: '1234567890'
        };

        const node = TreeNode.fromJSON(json);
        expect(node).toBeInstanceOf(SendSMSNode);
    });
});
