module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
  },
  projects: [
    {
      root: "./frontend",
      package: "./frontend/package.json",
      jsconfig: "./frontend/jsconfig.json",
    },
  ],
};