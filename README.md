# Commands

## Create an admin user using script in docker the, last 2 parameters are the user and password can be changed

```bash
docker compose -f docker-compose-dev.yml exec app node scripts/insert_user.js newuser newpass
```
