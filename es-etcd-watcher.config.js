const domain = process.env.DOMAIN
const etcdHost = process.env.ETCD_HOST
const etcdCa = process.env.ETCD_CA
const etcdKey = process.env.ETCD_KEY
const etcdCert = process.env.ETCD_CERT

function turnToKey(root) {
  if (!root.dir) {
    return root
  }
  if (!root.nodes) {
    return root
  }
  root.nodes = root.nodes.reduce((map, elem) => {
    map[elem.key] = turnToKey(elem)
    return map
  }, {})
  return root
}

const commands = [
  ({ root, changed, api }) => {
    const tree = turnToKey(root)

    return api.template({
      src: './templates/app.conf',
      dest: '/etc/nginx/sites-enabled/app.conf',
      data: {
        tree,
        domain,
      },
    })
  },
  'nginx -s reload'
]

const etcd = {
  host: etcdHost,
}
if (etcdCa) {
  etcd.scheme = 'https'
  etcd.agentOpts = {
    ca: etcdCa,
    key: etcdKey,
    cert: etcdCert,
  }
}

module.exports = {
  etcd,
  keys: [
    {
      key: '/registry/services/',
      commands,
    },
    {
      key: '/registry/minions/',
      commands,
    },
  ],
}
