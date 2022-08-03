import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const ERC20 = await ethers.getContractFactory("ERC20");
  console.log("start deploy");
  const erc20 = await ERC20.deploy();
  const erc20Deployed = await erc20.deployed();

  console.log("address Contract: ", erc20Deployed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
