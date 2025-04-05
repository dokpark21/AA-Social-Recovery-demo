// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract RecoveryAccountSCW {
    address public owner;
    address[] public guardians;
    mapping(address => bool) public isGuardian;
    mapping(address => mapping(address => bool)) public recoveryApprovals; // newOwner => guardian => approved
    mapping(address => uint256) public approvalCounts; // newOwner => count

    uint public constant RECOVERY_THRESHOLD = 2;

    event OwnerChanged(address indexed oldOwner, address indexed newOwner);
    event RecoveryApproved(address indexed guardian, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyGuardian() {
        require(isGuardian[msg.sender], "Not guardian");
        _;
    }

    constructor(address _owner, address[] memory _guardians) {
        require(
            _guardians.length >= RECOVERY_THRESHOLD,
            "Not enough guardians"
        );
        owner = _owner;
        guardians = _guardians;
        for (uint i = 0; i < _guardians.length; i++) {
            isGuardian[_guardians[i]] = true;
        }
    }

    function requestRecovery(address newOwner) external onlyOwner {
        // Clears previous approvals
        for (uint i = 0; i < guardians.length; i++) {
            recoveryApprovals[newOwner][guardians[i]] = false;
        }
        approvalCounts[newOwner] = 0;
    }

    function approveRecovery(address newOwner) external onlyGuardian {
        require(!recoveryApprovals[newOwner][msg.sender], "Already approved");
        recoveryApprovals[newOwner][msg.sender] = true;
        approvalCounts[newOwner]++;

        emit RecoveryApproved(msg.sender, newOwner);
    }

    function executeRecovery(address newOwner) external {
        require(
            approvalCounts[newOwner] >= RECOVERY_THRESHOLD,
            "Not enough approvals"
        );
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    function getGuardians() external view returns (address[] memory) {
        return guardians;
    }
}
