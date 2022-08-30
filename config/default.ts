export default {
  port: process.env.PORT || 3000,
  endpoint: process.env.ENDPOINT || 'http://localhost:3000/',
  salt: 10, // based on bcrypt docs
  accessTokenTtl: 1000 * 60 * 15, // 15 minutes in milliseconds
  refreshTokenTtl: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpuOKtZljrgfpBqKus/DtXEx6Q
nULEc7ZTtEWcecSq202ZkqsZfJfpN1a/bNXGyvMbMfbKuLM9hwBIw/s3O4vxSbKJ
J6bCOncZPeHwZdGa+ZJmjbTS5TRZErpNtih8ggmm/0hCkx9Q0g8ZTi7vUvD+0x+H
y0/d1SAn+W9A1bxQJQIDAQAB
-----END PUBLIC KEY-----`,
  privateKay: `-----BEGIN RSA PRIVATE KEY-----
MIICWQIBAAKBgQCpuOKtZljrgfpBqKus/DtXEx6QnULEc7ZTtEWcecSq202ZkqsZ
fJfpN1a/bNXGyvMbMfbKuLM9hwBIw/s3O4vxSbKJJ6bCOncZPeHwZdGa+ZJmjbTS
5TRZErpNtih8ggmm/0hCkx9Q0g8ZTi7vUvD+0x+Hy0/d1SAn+W9A1bxQJQIDAQAB
An8LRTvISAOfoAH+WjUMR7OpFJvy/n5wjT6OUGpO+ccVkXqVuCekiaGM2x/nllKb
4N5D8A1zaNB+RXi/XERSZqHkSCHmUzRMrX8exYD9pa7ECKohuppIfwCgSgqcMY9I
e5k1sxiIslqXqS+fxBKtVEWrIv8pLRSblRG2Y1pvlzChAkEA6gmUk4q+S/TjLiC8
n48iNEvFQfENMdTkvbshlsey9EQpMSseaNp8sTqMWx1AF24PpkxNMKVVNp8WfGhZ
KUbPzQJBALmmOPv0fi3QjGC1uQdpbfsH5qod8WPHBoct3Un/QWJgtY1GzO+48gYM
fp1HP8POQ18K+8Q1UXYxVeVy95P5ubkCQBj54MNGITzV65C2qaqVid7u3yREZ1YU
FD0zRUhkE3MB+ytmIJ6sAnafeu8WVgqqEj17ExnH6yojHDE2qZ1AE1kCQAC3eI7Y
cchBftk8ulsh+A+5BxXvCaiF8yuAbNNFTf5QO0MxW8ctIpoNYEvBI6jg2fe69h/a
yNa4+AjrubLzitkCQEEhK0jSYxlvfGAVYY383l+lnFvUcbsyinVoXQe1pnoQqFJu
2n9R7ZIAdQ016FrUGd33t2GHneQhHe3IWIwtXKI=
-----END RSA PRIVATE KEY-----`,
};
