const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('QuizContract', function () {
  let quizContract

  beforeEach(async function () {
    const QuizFactory = await ethers.getContractFactory('QuizContract')
    quizContract = await QuizFactory.deploy(
      ethers.utils.parseEther('1'),
      60
    )
    await quizContract.deployed()
    console.log('QuizContract deployed at:' + quizContract.address)
  })

  it('test initial values', async function () {
    expect(await quizContract.owner()).to.equal(
      await ethers.provider.getSigner(0).getAddress()
    )
    expect((await quizContract.cooldownTime()).toNumber()).to.equal(3600)
  })

  it('test submitSurvey function and minting', async function () {
    const [account] = await ethers.getSigners()

    await quizContract.addValidSurveyId(1)

    const initialBalance = await quizContract.balanceOf(account.address)
    expect(initialBalance).to.equal(0)
    await quizContract.submitSurvey(1, [1, 2, 3])

    const newBalance = await quizContract.balanceOf(account.address)
    expect(newBalance).to.equal(ethers.utils.parseEther('1'))
  })

  it('test cooldown period', async function () {
    await quizContract.addValidSurveyId(1)
    await quizContract.addValidSurveyId(2)

    // Submit the first survey
    await quizContract.submitSurvey(1, [1, 2, 3])

    // Try submitting a different survey before the cooldown period, which should fail due to cooldown
    await expect(
      quizContract.submitSurvey(2, [2, 3, 4])
    ).to.be.revertedWith('You need to wait before submitting again')
  })

  it('test updating prizeAmount by owner', async function () {
    await quizContract.setPrizeAmount(ethers.utils.parseEther('2'))
    expect(await quizContract.prizeAmount()).to.equal(
      ethers.utils.parseEther('2')
    )
  })

  it('test updating cooldownTime by owner', async function () {
    await quizContract.setCooldownTime(7200)
    expect((await quizContract.cooldownTime()).toNumber()).to.equal(7200)
  })

  it('test unauthorized update attempt', async function () {
    const [, otherAccount] = await ethers.getSigners()
    const quizWithOtherAccount = quizContract.connect(otherAccount)

    await expect(
      quizWithOtherAccount.setCooldownTime(7200)
    ).to.be.revertedWith('Ownable: caller is not the owner')
  })

  it('test submitSurvey with valid survey ID and answers', async function () {
    const [account] = await ethers.getSigners()

    await quizContract.addValidSurveyId(1)

    const initialBalance = await quizContract.balanceOf(account.address)
    expect(initialBalance).to.equal(0)

    await quizContract.submitSurvey(1, [2, 3, 1])

    const newBalance = await quizContract.balanceOf(account.address)
    expect(newBalance).to.equal(ethers.utils.parseEther('1'))
  })

  it('test submitSurvey with invalid survey ID', async function () {
    await expect(
      quizContract.submitSurvey(999, [1, 2, 3])
    ).to.be.revertedWith('Invalid surveyId')
  })

  it('test duplicate survey submissions', async function () {
    await quizContract.addValidSurveyId(1)
    await quizContract.submitSurvey(1, [1, 2, 3])

    await expect(
      quizContract.submitSurvey(1, [1, 2, 3])
    ).to.be.revertedWith('You have already submitted this survey')
  })

  it('test addValidSurveyId by owner', async function () {
    await quizContract.addValidSurveyId(1)
    expect(await quizContract.validSurveyIds(1)).to.equal(true)
  })

  it('test addValidSurveyId by non-owner', async function () {
    const [, otherAccount] = await ethers.getSigners()
    const quizWithOtherAccount = quizContract.connect(otherAccount)

    await expect(
      quizWithOtherAccount.addValidSurveyId(1)
    ).to.be.revertedWith('Ownable: caller is not the owner')
  })
})
