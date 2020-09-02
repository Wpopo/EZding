const global1 = Object.assign({}, global.window);
const global2 = Object.assign({}, global1.location);

const DOMAIN = `${global2.host}/`;
const ROOT_URL = `${global2.protocol}//${DOMAIN}`;
const MEMBER_URL = `${global2.protocol}//${DOMAIN}`;

module.exports = {
  DOMAIN,
  ROOT_URL,
  MEMBER_URL,
};
