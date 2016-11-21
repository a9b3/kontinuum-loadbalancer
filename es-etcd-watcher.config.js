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
      // dest: '/etc/nginx/sites-enabled/app.conf',
      dest: './test',
      data: {
        tree,
        domain: 'foo.com',
      },
    })
  },
  'nginx -s reload'
]

module.exports = {
  etcd: {
    host: '159.203.238.31',
  },
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
