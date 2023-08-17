# Udooku DS

- [x] Image Comparision Slider

## Setup caching for builds
- Follow this guide: https://vercel.com/docs/concepts/monorepos/remote-caching#use-remote-caching-from-external-ci/cd
- Fill env variables in deploy-docs workflow


## Publishing on NPM
- Create organization in NPM
- npm run changeset
    - select packages that changed with space key and enter
    - bump versions
    - set summary of the changes

- npm run version-packages
    - This command will update the version of the packages
    - Will also create a CHANGELOG.md file in package folder

- npm run release (after first release, use github push instead)