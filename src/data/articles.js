import React from "react";
const image1Url = "https://i.ibb.co/89PLYrF/1.png";
const image2Url = "https://i.ibb.co/5Fht4NC/2.png";
const image3Url = "https://i.ibb.co/bQp2z9m/3.png";
function article_1() {
	return {
		date: "18 July 2023",
		title: "Setting up a kubernetes cluster from scratch",
		description:
			"Setting up a Kubernetes cluster from scratch allows you to have full control over every aspect of the cluster's configuration and components. it's a nice way to see things from a deeper perspective!",
		keywords: ["kubernetes", "kubeadm"],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					outline: 2px solid red;
				}
				.responsive {
					width: 100%;
					height: auto;
				  }
				`,
		body: (
			<React.Fragment>
				<h1>Setting up a Kubernetes cluster from scratch</h1>

				<h2>Requirements:</h2>
				<p>
					You'll need at least two servers with at least 2GB in memory
					and 2 CPU cores. We'll use one as a master node and the
					other as a worker node (I’m using Linode: they give you $100
					for the first two months when signing up via this link
					&nbsp;
					<a
						href="https://www.linode.com/lp/free-credit-100/"
						target="_blank"
					>
						https://www.linode.com/lp/free-credit-100/
					</a>
					).
				</p>

				<h2>Steps</h2>
				<ul>
					<li>
						<strong>Disable Swap:</strong>
						<p>
							You MUST disable swap in order for the kubelet to
							work properly.
						</p>
						<code>$ sudo swapoff -a (on both servers)</code>
					</li>
					<li>
						<strong>
							Create a firewall and Edit inbound rules:
						</strong>
						<p>
							You can find the inbound rules inside the kubernetes
							documentation. Then you can associate the firewall
							to the appropriate node.
						</p>
						<img
							className="randImage responsive"
							src={image1Url}
							alt="Firewall Setup"
						/>
						<img
							className="randImage responsive"
							src={image2Url}
							alt="Firewall Setup"
						/>
					</li>
					<li>
						<strong>Change Hostnames (Optional):</strong>
						<p>
							It’s recommended to change hostnames for the
							servers, for example:
						</p>
						<code>$ sudo hostnamectl set-hostname master</code>
					</li>
					<li>
						<strong>Install Kubernetes Components:</strong>
						<p>
							Install kubelet, kubeadm, and kubectl from the
							Kubernetes documentation on each server. You can
							check the service like this to know if it’s working
							fine.
						</p>
						<p>
							Source:{" "}
							<a
								href="https://github.com/containerd/containerd/blob/main/docs/getting-started.md"
								target="_blank"
							>
								Install containerd
							</a>
						</p>
						<p>
							Source:{" "}
							<a
								href="https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl"
								target="_blank"
							>
								Installing kubeadm, kubelet and kubectl
							</a>
						</p>
						<code>$ service kubelet status</code>
						<img
							className="randImage responsive"
							src={image3Url}
							alt="Kubernetes Components"
						/>
					</li>
					<li>
						<strong>Initialize Master Node:</strong>
						<p>On the master only:</p>
						<code>
							$ rm /etc/containerd/config.toml $ systemctl restart
							containerd $ kubeadm init
							--apiserver-advertise-address=10.x.x.x *private
							address of the master node
						</code>
						<p>
							Afterward, you can see if everything is working fine
							using:
						</p>
						<code>
							$ sudo kubectl get node --kubeconfig
							/etc/kubernetes/admin.conf
						</code>
						<p>
							In case of an error (can happen when using a Ubuntu
							version that's greater than 21.04 with cgroupv2
							introduced), troubleshoot inside{" "}
							<code>
								/var/log/pods/kube-system_kube-apiserver-master_xxxx/kube-apiserver/x.log
							</code>
							.
						</p>
						<p>
							Source:{" "}
							<a
								href="https://stackoverflow.com/questions/55571566/unable-to-bring-up-kubernetes-api-server"
								target="_blank"
							>
								Stack Overflow
							</a>
						</p>
					</li>
					<li>
						<strong>Configure kubectl for Non-root User:</strong>
						<p>
							To change commands from{" "}
							<code>
								sudo kubectl get node --kubeconfig
								/etc/kubernetes/admin.conf
							</code>{" "}
							to basic <code>kubectl get node</code>, you are
							basically making kubectl work for your non-root
							user.
						</p>
						<code>
							mkdir -p $HOME/.kube sudo cp -i
							/etc/kubernetes/admin.conf $HOME/.kube/config sudo
							chown $(id -u):$(id -g) $HOME/.kube/config
						</code>
					</li>
					<li>
						<strong>Install Network Plugin:</strong>
						<p>To verify, do:</p>
						<code>$ kubectl get node -n kube-system</code>
						<p>
							You’ll find that Coredns is in a pending state. I'm
							using WeaveNet, but you can use any from the
							Kubernetes documentation. After installing the
							network plugin, Coredns and cluster nodes should run
							automatically.
						</p>
					</li>
					<li>
						<strong>Join Worker Nodes:</strong>
						<p>On Master:</p>
						<code>$ kubeadm token create --print-join-command</code>
						<p>Use the output on the worker node:</p>
						<code>
							$ kubeadm join 192.168.154.199:6443 --token $token
						</code>
						<p>
							Tip: Use <code>--help</code> to find the exact
							command.
						</p>
						<p>To check that everything works fine:</p>
						<code>
							$ kubectl exec -n kube-system weave-net-8nxlb -c
							weave -- /home/weave/weave --local status
						</code>
					</li>
				</ul>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1];

export default myArticles;
