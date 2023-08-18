// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizContract is ERC20, Ownable {
    uint256 public prizeAmount;
    uint256 public cooldownTime;

    mapping(address => mapping(uint256 => bool)) public hasSubmitted;
    mapping(address => uint256) public lastSubmissionTime;
    mapping(uint256 => bool) public validSurveyIds;
    mapping(address => mapping(uint256 => uint256[])) public userAnswers;

    event Submitted(address indexed user, uint256 surveyId, uint256[] answers);

    constructor(
        uint256 _prizeAmount,
        uint256 _cooldownTime
    ) ERC20("Quiz Token", "QUIZ") {
        prizeAmount = _prizeAmount;
        cooldownTime = _cooldownTime;
    }

    function submitSurvey(uint256 surveyId, uint256[] memory answers) public {
        require(validSurveyIds[surveyId], "Invalid surveyId");
        require(
            !hasSubmitted[msg.sender][surveyId],
            "You have already submitted this survey"
        );

        require(
            block.timestamp - lastSubmissionTime[msg.sender] >= cooldownTime,
            "You need to wait before submitting again"
        );

        hasSubmitted[msg.sender][surveyId] = true;
        lastSubmissionTime[msg.sender] = block.timestamp;
        userAnswers[msg.sender][surveyId] = answers;

        emit Submitted(msg.sender, surveyId, answers);
        _mint(msg.sender, prizeAmount);
    }

    function addValidSurveyId(uint256 surveyId) public onlyOwner {
        validSurveyIds[surveyId] = true;
    }

    function setPrizeAmount(uint256 _prizeAmount) public onlyOwner {
        prizeAmount = _prizeAmount;
    }

    function setCooldownTime(uint256 _cooldownTime) public onlyOwner {
        cooldownTime = _cooldownTime;
    }
}
