---
title: Docker
---

Thanks to @Nevexo, one of the contributors for the project, **starting with cState v4.3** there is official Docker support.

**We still recommend using cState as a serverless option on, for example, Netlify, because the authors can attempt to give support and guidance. However, this is an alternative for effectively what is dynamic hosting instead of the aforementioned static hosting. Proceed if you so wish.**
 

# This is the newest documentation from version 5 onwards. You can [read the older version, if there is something you do not find on this page.](https://github.com/cstate/cstate/wiki/Outdated-Docker-Documentation-for-v4.3)

cState can run on Docker for both production and development purposes. 

## Building the Image

cState (currently) doesn't have a publicly built image, so it must be built manually. You can do this on any machine that has
Docker and Git installed.

1. Clone the main cState repository: `git clone https://github.com/cstate/cstate`
2. Navigate to the cState directory: `cd cstate`
3. Build the image: `docker build -t cstate .` (note: you can add :[version] after cState if you wish to have multiple versions of cState available).


## Run the Container

Once you've built (or pulled) the container, you can run cState. 

`docker run -p 8080:80 --name=cstate -v /var/cstate:/app cstate`

> You can replace 8080 with any other port, this is where cState will listen on the host computer.

> You can replace /var/cstate with any other path, this is where cState's files will be stored, the user managing cState will need access to this directory. 

## Reloading Modifications

Once files have been modified locally, the site must be rebuilt with Hugo. The easiest way to do this is to simply restart the container.

`docker restart cstate`

If restarting the container isn't a possibility, you can manually run hugo with docker exec

\`\`\`
docker exec -it cstate /bin/ash
cd /app
hugo
cp -r /app/public/* /usr/share/nginx/html
\`\`\`