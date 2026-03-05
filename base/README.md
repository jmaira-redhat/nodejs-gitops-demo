# 🛠 Why kustomize-config.yaml is Required
By default, Kustomize's namePrefix transformer is "smart" enough to rename standard Kubernetes objects like Deployments and Services. However, Kustomize does not natively understand OpenShift-specific resources like Routes.

# The Problem
When we apply namePrefix: dev- in an overlay:

Kustomize renames the Service from my-app to dev-my-app.

Kustomize renames the Route from my-app to dev-my-app.

# The Issue: 
Kustomize does not update the pointer inside the Route (spec.to.name). It remains my-app, causing a "Route not resolve" error because the Route is now looking for a Service name that doesn't exist.

# The Solution: nameReference
We use a Custom Transformer Configuration to "teach" Kustomize about this relationship.
```
# base/kustomize-config.yaml
nameReference:
- kind: Service
  version: v1
  fieldSpecs:
  - path: spec/to/name
    kind: Route
```

What this tells Kustomize:

"Whenever you rename a Service, look for any Route objects and update the value at spec/to/name to match the new Service name."

How to Implement
This configuration is linked in the base/kustomization.yaml so it applies to every environment (Dev, Test, Prod):

```
# base/kustomization.yaml
resources:
  - deployment.yaml
  - service.yaml
  - route.yaml

configurations:
  - kustomize-config.yaml
```