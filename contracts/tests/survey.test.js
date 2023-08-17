
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SurveyContract", function () {

  let surveyContract;

  beforeEach(async function () {
    const Survey = await ethers.getContractFactory("SurveyContract");
    const [account] = await ethers.getSigners();
    surveyContract = await Survey.deploy(ethers.utils.parseEther("1"), 3600);
    await surveyContract.deployed();
    await surveyContract.connect(account).fundContract({ value: ethers.utils.parseEther("2") });
    console.log('SurveyContract deployed at:' + surveyContract.address);
  });

  it("test initial values", async function () {
    expect(await surveyContract.owner()).to.equal(await ethers.provider.getSigner(0).getAddress());
    expect(await surveyContract.prizeAmount()).to.equal(ethers.utils.parseEther("1"));
    expect((await surveyContract.cooldownTime()).toNumber()).to.equal(3600);
  });

  it("test updating prize and cooldown time by owner", async function () {
    // Change prize amount and cooldown time
    await surveyContract.setPrizeAmount(ethers.utils.parseEther("2"));
    await surveyContract.setCooldownTime(7200);

    // Check if the values have been updated
    expect(await surveyContract.prizeAmount()).to.equal(ethers.utils.parseEther("2"));
    expect((await surveyContract.cooldownTime()).toNumber()).to.equal(7200);
  });

  it("test unauthorized update attempt", async function () {
    const [, otherAccount] = await ethers.getSigners();
    const contractWithOtherAccount = surveyContract.connect(otherAccount);

    // Try to change prize amount and cooldown time with a non-owner account
    await expect(contractWithOtherAccount.setPrizeAmount(ethers.utils.parseEther("2"))).to.be.revertedWith("Only the owner can call this function");
    await expect(contractWithOtherAccount.setCooldownTime(7200)).to.be.revertedWith("Only the owner can call this function");
  });

  it("test survey submission and prize withdrawal", async function () {
    // Using the first account for the test
    const [account] = await ethers.getSigners();
    const initialBalance = await ethers.provider.getBalance(account.address);

    // Submit the survey
    const tx = await surveyContract.submitSurvey();
    const receipt = await tx.wait();

    // Get the final balance after the transaction
    const finalBalance = await ethers.provider.getBalance(account.address);

    // Print the gas used and the gas price for debugging
    console.log('Gas Used:', receipt.gasUsed.toString());
    console.log('Gas Price:', tx.gasPrice.toString());

    // Calculate the expected net change after considering gas fees
    const gasCost = receipt.gasUsed.mul(tx.gasPrice);
    const netChange = finalBalance.sub(initialBalance).add(gasCost);

    console.log('Net Change:', netChange.toString());

    // Define a tolerance value for comparison
    const TOLERANCE = ethers.utils.parseEther("0.002"); // adjust as needed

    // The account balance should increase by approximately 1 ETH minus the gas fees
    expect(netChange).to.be.closeTo(ethers.utils.parseEther("1"), TOLERANCE);
  });

  it("test cooldown period", async function () {
    const [account] = await ethers.getSigners();

    // Submit the survey once
    await surveyContract.submitSurvey();

    // Try submitting again, which should fail
    await expect(surveyContract.submitSurvey()).to.be.revertedWith("You need to wait before submitting again");
  });
});
