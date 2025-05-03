# vue3-quasar-frontend 

## Development Workflow

### Development Environment Requirements

- nodejs >= 18.14.0
- npm >= 9.3.1

```bash
$ cd vue3-quasar-frontend 

# Install dependencies
$ yarn install

# Start and enable hot reload on localhost:3000
$ npm run dev
```

---

## Deployment Workflow

### Pre-deployment Process

1. Before running, make sure the `.env` in the `docker` container and the `.env` in the root directory are properly configured.
2. If `nginx` is required, run `compose.nginx`:
   ```bash
   docker compose -f compose.nginx.yml up -d
   ```

### Initial Deployment

1. Confirm the execution environment:

   ```bash
   docker compose up -d --build
   ```

2. Deployment is complete.

### Update Deployment

1. Use `git` to update the files.
2. After confirming the updated files, run the build process:
   ```bash
   docker compose up -d --build
   ```
3. Deployment update is complete.
