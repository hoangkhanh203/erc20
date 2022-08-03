import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const ERC20 = await ethers.getContractFactory("ERC20");
  const erc20 = await ERC20.deploy();
  const erc20Deployed = await erc20.deployed();
  console.log("address Contract: ", erc20Deployed.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
