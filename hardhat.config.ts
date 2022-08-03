import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      },

      accounts: [
        {
          privateKey:
            "68c0cd8834ca2b6a3ec1ebec24952f675da5970b929da8731eac5118b123e797", // 0x6C732a51F3Cb845A204ABEafE3834FBA425Ce065
          balance: "10000000000000000000000000000",
        },
        {
          privateKey:
            "4b549f0f119bf153b240b9cde1571085239abda7562440dfe05cab5a3bdcb6c1", // 0x9cD1816Ba666ae3096BC2dd94B0356f3D6c365fD
          balance: "10000000000000000000000000000",
        },
      ],
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [
        "0x68c0cd8834ca2b6a3ec1ebec24952f675da5970b929da8731eac5118b123e797",
        "0x4b549f0f119bf153b240b9cde1571085239abda7562440dfe05cab5a3bdcb6c1",
      ],
    },
  },
  mocha: {
    timeout: 0,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
};

export default config;
