# Contributing Guide

If you're new to contributing to open source software
[this guide](https://opensource.guide/how-to-contribute/) guide is a great read.

## Not sure where to start?

A great place to jump in are issues labeled [Beginner Friendly](https://github.com/cujarrett/glimpse-backend/labels/Beginner%20Friendly).

## Chat

Feel free to join the [Banshee-44 Mods Bot Discord](https://discord.gg/Pv3xrPV) if you have questions.

## Pull Request Checklist

- [ ] - Documentation is updated if needed
- [ ] - Passing CI pipeline

## What's the tech stack?

This project uses [Node.js](https://nodejs.org/en/) as my language of choice. I'm using [AWS](https://aws.amazon.com/) for my infrastructure. I'm using [Terraform](https://www.terraform.io/) for my
[Infrastructure as Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code) and if I wanted to have this deployed I'd do so with
[Terraform Cloud](https://www.terraform.io/docs/cloud/overview.html) to provision my infrastructure,
either on demand or in response to various events.

I'm leveraging compute via [AWS Lambda](https://aws.amazon.com/lambda/) for all of the benefits of having a serverless architecture.

I'm using [AWS API Gateway](https://aws.amazon.com/api-gateway/) to create our RESTful API. API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management.

## Developer Setup
Setup and use requires [Git](https://git-scm.com/), [Node JS](https://nodejs.org/en/), and a text
editor such as [VS Code](https://code.visualstudio.com/).

This project is built for the latest Node LTS and npm versions. You can
check your node version with `node -v` and your npm version with `npm -v`.

If you're on a Mac, I'd suggest using [Homebrew](https://brew.sh/) for installing the required
software listed in Setup.

### Cloning & Dependency Installations
```sh
git clone git@github.com:cujarrett/glimpse-backend.git
cd glimpse-backend
npm install
```

### Run Linting
Finds problematic patterns or code that doesn’t adhere to certain style guidelines
```sh
npm run lint
```

### Fix linting errors (automated)
```sh
npm run fix-lint
```

## Terraform

This project uses [Terraform](https://www.terraform.io/) to create, edit, and delete its infrastructure to [AWS](https://aws.amazon.com/).

### terraform apply

The Terraform in this project requires variables.

- acm_certificate_arn`: `arn:aws:acm:REDACTED:REDACTED:certificate/REDACTED`

### Commit Message Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) specification to
aid in automated releases and change log generation. [Commitlint](https://github.com/conventional-changelog/commitlint)
is enabled and ran as a `commit-msg` hook to enforce the commit format.
[Commitizen](http://commitizen.github.io/cz-cli/) can be used to prompt through any requirements at commit time
`npm run commit` (or `git cz` if Commitizen is installed globally).

In short, if a commit will be fixing a bug, prefix the commit message with `fix:`

```sh
fix: my bug fix
```

```sh
feat: my new feature
```

Commits with `fix:` prefix will show up in the generated changelog as bullets under the `Bug Fixes:` section, and
`feat:` prefixed messages will show under the `Features:` section. For more on the available prefixes/rules, see
[here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules).
