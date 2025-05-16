module.exports = {
  transformIgnorePatterns: ['/node_modules/(?!(@vercel/analytics|@vercel/speed-insights)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['react-app'] }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
