// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SurveyContract {
    address public owner;
    uint256 public prizeAmount;
    uint256 public cooldownTime;

    mapping(address => bool) public hasSubmitted;
    mapping(address => uint256) public lastSubmissionTime;

    event Submitted(address indexed user, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _prizeAmount, uint256 _cooldownTime) {
        owner = msg.sender;
        prizeAmount = _prizeAmount;
        cooldownTime = _cooldownTime;
    }

    function submitSurvey() public {
        require(block.timestamp - lastSubmissionTime[msg.sender] >= cooldownTime, "You need to wait before submitting again");
        require(!hasSubmitted[msg.sender], "You have already submitted the survey");

        hasSubmitted[msg.sender] = true;
        lastSubmissionTime[msg.sender] = block.timestamp;

        payable(msg.sender).transfer(prizeAmount);

        emit Submitted(msg.sender, block.timestamp);
    }

    function fundContract() public payable {}

    function setPrizeAmount(uint256 _prizeAmount) public onlyOwner {
        prizeAmount = _prizeAmount;
    }

    function setCooldownTime(uint256 _cooldownTime) public onlyOwner {
        cooldownTime = _cooldownTime;
    }
}
