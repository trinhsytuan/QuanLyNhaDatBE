const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const FabricCAServices = require("fabric-ca-client");
const { location_blockchain } = require("../constant/constant.js");
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
async function getWalletSystemByUser(userID, wallet) {
  const ccpPath = path.resolve(location_blockchain.WALLET_SERVER);
  let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: userID,
    discovery: { enabled: true, asLocalhost: true },
  });
  return gateway;
}
async function enrollByID(userID) {
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
      enrollmentID: userID,
      role: "client",
    },
    adminUser
  );
  const enrollment = await ca.enroll({
    enrollmentID: userID,
    enrollmentSecret: secret,
  });
  const x509Identity = {
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

module.exports = {
  getWalletSystemByDefault,
  getWalletSystemByUser,
  enrollByID,
  revokeIdentity,
};
