# Shopify Backend Developer Intern Challenge - Summer 2022

#### By Kyler Swanson

---

Shopify Challenge Document: https://docs.google.com/document/d/1z9LZ_kZBUbg-O2MhZVVSqTmvDko5IJWHtuFmIu_Xg1A/edit#heading=h.n7bww7g70ipk

In my implementation of the project, I used NodeJS with Express as a backend CRUD API. I built a basic frontend which consumes the API. The additional feature that I've added is the ability to export the products/items to a CSV file.

Once the application is built and running, navigate to http://localhost:8080. Here, you can view a list of items, create items, modify existing items, and delete items.

You may also click the "Export to CSV" button to download a CSV of the created items.

---

Note: You must have Docker/Docker Desktop installed and running in order to start the project.

Start by setting permissions:

```bash
chmod 755 ./scripts/*.sh
```

To run:

```bash
./scripts/run-dev.sh
```

To stop:

```bash
docker-compose down
```

To test:

```bash
./scripts/run-test.sh
```
