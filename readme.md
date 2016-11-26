# Kontinuum Load Balancer

The purpose of the image is to run an nginx loadbalancer that will automatically detect subdomains via etcd.

Uses [es-etcd-watcher](https://github.com/esayemm/es-etcd-watcher) for watching etcd keys.

If etcd has ssl, make sure you have the ca, key and cert files ready. Run the docker container with the following flags, change variables accordingly. `DOMAIN` should be whatever domain name you have registered.

```sh
docker run --name kontinuum-lb -d --restart on-failure:5 \
	-e DOMAIN='foo.com' \
	-e ETCD_HOST='0.0.0.0' \
	-e ETCD_CA='/etc/etcd/ca.pem' \
	-e ETCD_KEY='/etc/etcd/ca.key' \
	-e ETCD_CERT='/etc/etcd/ca.crt' \
	-v /etc/etcd:/etc/etcd \
	--net="host" \
	esayemm/kontinuum-loadbalancer
```