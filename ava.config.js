module.exports = {
  extensions: {
    ts: "commonjs",
  },

  require: ["ts-node/register"],
  failWithoutAssertions: true,
  files: ["src/**/*.test.ts", "!src/**/*.integration.test.ts"],
  timeout: "60s",
  workerThreads: false,
};
