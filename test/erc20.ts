import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import BigNumber from "bignumber.js";

const infoERC20 = {
  totalSupply: 100000000000000000000000, // 100000
  name: "Token Kelvin Jess",
  symbol: "TKJ",
  decimals: 18,

  routerPancakeSwap: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
};

const parseNumberToUnit = (amount: number, decimals: number) =>
  new BigNumber(amount * 10 ** decimals).toString(10);

describe("ERC20", function () {
  async function deployContract() {
    const [owner, user1] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    return { erc20, owner, user1 };
  }

  describe("Deployment", function () {
    it("TotalSupply", async function () {
      const { erc20 } = await loadFixture(deployContract);
      expect(await (await erc20.totalSupply()).toString()).to.equal(
        new BigNumber(infoERC20.totalSupply.toString(10)).toString(10)
      );
    });

    it("Name", async function () {
      const { erc20 } = await loadFixture(deployContract);

      expect(await (await erc20.name()).toString()).to.equal(
        infoERC20.name.toString()
      );
    });

    it("Symbol", async function () {
      const { erc20 } = await loadFixture(deployContract);

      expect(await (await erc20.symbol()).toString()).to.equal(
        infoERC20.symbol.toString()
      );
    });

    it("Decimals", async function () {
      const { erc20 } = await loadFixture(deployContract);

      expect(await (await erc20.decimals()).toString()).to.equal(
        infoERC20.decimals.toString()
      );
    });

    it("TotalSupply match with balance of owner", async function () {
      const { erc20, owner } = await loadFixture(deployContract);
      const balance = await erc20.balanceOf(owner.address);

      expect(await (await erc20.balanceOf(owner.address)).toString()).to.equal(
        new BigNumber(infoERC20.totalSupply.toString(10)).toString(10)
      );
    });

    it("Min Token", async function () {
      const { erc20, owner } = await loadFixture(deployContract);
      const totalSupplyBeforeMin = await erc20.totalSupply();
      const mintToken = await erc20.mint(
        ethers.utils.parseEther("10").toString()
      );
      const totalSupplyAfterMin = await erc20.totalSupply();

      expect(totalSupplyAfterMin).to.greaterThan(totalSupplyBeforeMin);
    });

    it("Burn Token", async function () {
      const { erc20, owner } = await loadFixture(deployContract);
      const totalSupplyBeforeBurn = await erc20.totalSupply();
      await erc20.burn(ethers.utils.parseEther("10").toString());
      const totalSupplyAfterBurn = await erc20.totalSupply();

      expect(totalSupplyAfterBurn).to.lessThan(totalSupplyBeforeBurn);
    });

    it("Approve Token", async function () {
      const { erc20, owner, user1 } = await loadFixture(deployContract);
      const allowance = await erc20.allowance(
        user1.address,
        infoERC20.routerPancakeSwap
      );

      await erc20.approve(
        infoERC20.routerPancakeSwap,
        parseNumberToUnit(10000, 18)
      );

      expect(new BigNumber(allowance.toString()).toString(10)).to.equal(
        parseNumberToUnit(0, 18)
      );
    });

    it("Allowance Token", async function () {
      const { erc20, owner, user1 } = await loadFixture(deployContract);
      const allowance = await erc20.allowance(
        user1.address,
        infoERC20.routerPancakeSwap
      );
      expect(new BigNumber(allowance.toString()).toString(10)).to.equal(
        parseNumberToUnit(0, 18)
      );
    });

    it("Transfer Token", async function () {
      const { erc20, owner, user1 } = await loadFixture(deployContract);
      const totalSupplyBeforeMin = await erc20.totalSupply();

      const transfer = await erc20.transfer(
        user1.address,
        ethers.utils.parseEther("10").toString()
      );
      const balanceOfUser1 = await erc20.balanceOf(user1.address);
      expect(new BigNumber(balanceOfUser1.toString()).toString(10)).to.equal(
        parseNumberToUnit(10, 18)
      );
    });
  });
});
