export default {
  // Configura o Jest para testes no Node.js
  // usando Typescript.
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  // Informa em qual diretório os testes
  // estarão contidos.
  roots: ["<rootDir>/tests"],
  // Configurações de cobertura de código.
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
};
