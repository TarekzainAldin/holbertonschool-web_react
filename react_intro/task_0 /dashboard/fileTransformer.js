import path from 'path';

export default {
  process(sourceText, sourcePath, options) {
    void options;
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
