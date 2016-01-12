docker kill etcd;docker rm etcd;
export HostIP="192.168.100.2"
docker run -d --restart=always -p 2379:2379 -p 2380:2380 -p 4001:4001\
 --name etcd dhub.yunpro.cn/coreos/etcd:v2.1.1 \
 -name etcd0 \
 -advertise-client-urls http://${HostIP}:2379,http://${HostIP}:4001 \
 -listen-client-urls http://0.0.0.0:2379,http://0.0.0.0:4001 \
 -initial-advertise-peer-urls http://${HostIP}:2380 \
 -listen-peer-urls http://0.0.0.0:2380 \
 -initial-cluster-token etcd-cluster-1 \
 -initial-cluster etcd0=http://${HostIP}:2380 \
 -initial-cluster-state new
