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
```

# 🚀 The Demo Workflow

1. The "Outer Loop" (CI)
  When code is pushed to the main branch:
  
  - Build: GitHub Actions builds a new image using the Red Hat UBI-based Node.js runtime.
  
  - Push: The image is pushed to quay.io/jmaira/gitopsdemo using the Git Commit SHA as the unique tag.
  
  - Automate: The workflow uses kustomize edit to update overlays/dev/kustomization.yaml with the new SHA.

 2. The "Inner Loop" (CD)
  - Detect: ArgoCD receives a webhook from GitHub and instantly identifies the new commit.
  
  - Deploy: ArgoCD performs a rolling update in the demo-dev-api namespace.
  
  - Verify: Access the application via the OpenShift Route to see the updated message and SHA.

3. Promotion
  To promote a validated version from Dev to Test or Prod:
  
  Manually copy the newTag and IMAGE_INFO string from the dev overlay to the target environment's kustomization.yaml.
  
  This ensures environment parity—the exact same binary that was tested is what goes to production.
