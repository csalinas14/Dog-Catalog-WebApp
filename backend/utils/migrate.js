require('ts-node/register');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires, @typescript-eslint/no-floating-promises
require('./db').migrator.runAsCLI();
