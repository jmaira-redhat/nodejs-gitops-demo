# 🚀 Full-Stack Node.js GitOps Demo

This repository demonstrates a complete **End-to-End CI/CD and GitOps Workflow** on OpenShift. It integrates a Node.js API, GitHub Actions for CI, Quay.io for container storage, and OpenShift GitOps (ArgoCD) for CD.



## 🏗 Repository Architecture
- **`app.js`**: A Node.js API that reports its environment and version.
- **`.github/workflows/`**: Automation that builds images on code push and updates manifests.
- **`base/`**: Core Kubernetes manifests (Deployment, Service, Route).
- **`overlays/`**: Kustomize environments for **Dev**, **Test**, and **Prod**.
- **`bootstrap/`**: Cluster-level setup (Namespaces and ArgoCD Application definitions).

---

## 🛠 One-Command Environment Setup

To recreate this entire demo environment on any OpenShift cluster with GitOps installed, run:

```bash
# 1. Create Namespaces and Labels
oc apply -f bootstrap/namespaces.yaml

# 2. Create the ArgoCD Applications
oc apply -f bootstrap/argo-apps.yaml


