module.exports = async function(site) {
  const fs = require('fs-extra');
  const sitemap = require('@astronomersiva/sitemap-static');

  const { BUILD, STATIC } = require('../utils/constants');

  try {
    let writer = fs.createWriteStream(`${BUILD}/sitemap.xml`);
    let { url } = site.getConfig();

    if (!url) {
      let logger = site.getLogger();
      logger.info('Please specify a `url` field in lego.js to generate a sitemap.');
      return;
    }

    sitemap(writer, {
      findRoot: BUILD,
      ignoreFiles: [`${BUILD}/${STATIC}/`, `${BUILD}/404`, `${BUILD}/404.html`],
      prefix: url,
      pretty: true
    });
  } catch (error) {
    throw error;
  }
}
