const { Gateway, Wallets, X509Identity } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const FabricCAServices = require("fabric-ca-client");
const { location_blockchain } = require("../constant/constant.js");
const { computeMD5Hash } = require("../utils/utils.js");
async function getWalletSystemByDefault() {
  const ccpPath = path.resolve(location_blockchain.WALLET_SERVER);
  let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
  const walletPath = path.join(location_blockchain.CERT_SERVER);
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const identity = await wallet.get("appUser");
  if (!identity) {
    throw new Error({ success: false, message: "Lỗi không có identity" });
    return;
  }
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "appUser",
    discovery: { enabled: true, asLocalhost: true },
  });
  return gateway;
}
async function getWalletSystemByUser(userID, publicKey, privateKey) {
  const ccpPath = path.resolve(location_blockchain.WALLET_SERVER);
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: publicKey,
      privateKey: privateKey,
    },
    mspId: "Org1MSP",
    type: "X.509",
    version: 1,
  };
  await wallet.put(userID, identity);
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: userID,
    discovery: { enabled: true, asLocalhost: true },
  });
  return gateway;
}
async function enrollByID(userID, idSignature) {
  const ccpPath = path.resolve(location_blockchain.WALLET_SERVER);
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
  const caURL = ccp.certificateAuthorities["ca.org1.example.com"].url;
  const ca = new FabricCAServices(caURL);
  const walletPath = path.join(location_blockchain.CERT_SERVER);
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const adminIdentity = await wallet.get("admin");
  if (!adminIdentity) {
    throw new Error({ success: false, message: "Không có admin" });
  }
  const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
  const adminUser = await provider.getUserContext(adminIdentity, "admin");
  const secret = await ca.register(
    {
      affiliation: "org1.department1",
      enrollmentID: idSignature,
      role: "client",
    },
    adminUser
  );
  const enrollment = await ca.enroll({
    enrollmentID: idSignature,
    enrollmentSecret: secret,
  });
  const x509Identity = {
    hashKey: computeMD5Hash(enrollment.key.toBytes()),
    user: userID,
    credentials: {
      certificate: enrollment.certificate,
      privateKey: enrollment.key.toBytes(),
    },
    mspId: "Org1MSP",
    type: "X.509",
  };
  return x509Identity;
}
async function revokeIdentity(userID) {
  const ccpPath = path.resolve(location_blockchain.WALLET_SERVER);
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
  const caURL = ccp.certificateAuthorities["ca.org1.example.com"].url;
  const ca = new FabricCAServices(caURL);
  const walletPath = path.join(location_blockchain.CERT_SERVER);
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const adminIdentity = await wallet.get("admin");
  if (!adminIdentity) {
    throw new Error({ success: false, message: "Không có admin" });
  }
  const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
  const adminUser = await provider.getUserContext(adminIdentity, "admin");
  await ca.revoke(
    {
      enrollmentID: userID,
      reason: "Some reason for revocation",
    },
    adminUser
  );
  return {
    success: true,
    message: `Đã thu hồi chứng chỉ của người dùng ${userID}`,
  };
}
async function pushDataToBlockchain(gateway, data, magiayto) {
  const network = await gateway.getNetwork("mychannel");
  const contract = network.getContract("fabcar");
  const response = await contract.submitTransaction(
    "createCar",
    JSON.stringify(data),
    magiayto
  );
  await gateway.disconnect();
  return response;
}
module.exports = {
  getWalletSystemByDefault,
  getWalletSystemByUser,
  enrollByID,
  revokeIdentity,
  pushDataToBlockchain,
};
