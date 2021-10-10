---
title: Outdated Docker Documentation for v4.3
---

# THIS DOCUMENTATION IS OUTDATED. [READ LATEST](https://github.com/cstate/cstate/wiki/Docker/)

Thanks to @Nevexo, one of the contributors for the project, **starting with cState v4.3** there is official Docker support.

**We still recommend using cState as a serverless option because the author of cState can attempt to give support and guidance. This is just an alternative for effectively what is dynamic hosting instead of the standard static hosting.**

***

Adding a Dockerfile allows cState to operate without a serverless system, such as Netlify, but also makes development a little easier as you don't need to install the required dependencies onto your machine, such as Hugo. This can make development on non-UNIX based systems a little easier and removes the requirement of installing Hugo to develop cState.

Docker support is achieved with two new files: `Dockerfile` & `docker/entrypoint.sh`.

* **The Dockerfile** configures the Docker image, pulls cState and configures it for first run.
* The Dockerfile will clone the example repo into the working directory & then install the files from this repo on top of it, this method could be improved in the future, but this solution allows the Dockerfile to work on the development environment, rather than using the submodules within the example repo.
* **The entrypoint script** file exists to build cstate on every startup. This is required as all files are compiled into the public directory.
Once building is finished the public files are moved into NGINX's working directory and the server starts.

— @Nevexo 

## Installing cState with Docker

1. Clone the repo:
`git clone https://github.com/cstate/cstate`

2. Build the Docker image:
`cd cstate/`
`docker build -t cstate .`

3. Run the container (mount):
`docker run -p 8080:80 --mount type=bind,source=/var/cstate,target=/app --name=cstate cstate`

The above command will create a directory in /var called 'cstate' this is where all files will exist for modifying the issues & templates of cState, the NGINX server will listen at port 8080.

4. Run the container (volume)
`docker run --rm -p 8080:80 -v cstate:/app --name=cstate cstate`

This command will create a new docker volume. This isn't recommended as modifying the files within a volume can be tricky.
The volume will be named 'cstate' and the NGINX server will listen at port 8080.

### Reloaded modified files

The easiest way to reload cState after modifying it's files is to run `docker restart cstate` as the container will also recompile the files on startup.

If restarting the container is not an option, you can use `docker exec -it cstate /bin/ash` to launch a shell into the container, and then use the following commands:

```
cd /app
hugo
cp -r /app/public/* /usr/share/nginx/html
```

This will rebuild cState and copy the files back into the NGINX directory.

## How does it work?

### First run

- NGINX is downloaded with Alpine Linux
- cstate/example is downloaded
- cState source files are copied into /themes/cstate

### Every run

- `hugo` is run against the source files
- The /cstate/public folder is copied into the `www-data` folder of NGINX
- NGINX starts

And now cState is up with Docker, NGINX.

### Further explanation

The Docker file first sets up a little Linux server that comes with NGINX. Then there's a line `RUN apk add hugo` which then stalls `hugo`. The Docker file also copies the entrypoint script into the startup folder of the container, so when the container starts, it runs `hugo` on the source files and compiles everything that was compiled into the running directory of NGINX so that it can be accessed.

