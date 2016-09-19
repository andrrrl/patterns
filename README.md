## Requirements ##
- Node.js
- npm
- MongoDB
- ImageMagick package (optional, used for rendering projects to single PNG frames or GIF animations)

## Installation ##
- Clone this repository:
`git clone https://github.com/andrrrl/velours`

- Enter directory:
`cd velours`

- Install dependencies:
`npm install`  
It will also run an install script, located at `./utils/install.js` which will generate a `.env` file using `env.example` as a blueprint. If `.env` file already exists, the install script **will not** overwrite it.

- Install optional dependencies:
Debian/Ubuntu: `apt-get install imagemagick`  
OSX: `brew install imagemagick`  
This tool will allow generating GIF animation out of a project

## Running ##
- MongoDB service needs to be set and running.
- Check your configuration in the `.env` file.
- Run Velours with:
`npm start`   
And navigate to [localhost:8080](http://localhost:8080)

## Usage ##
- Define start variables, like colors, dimensions, type of stitch... most of them are very self-explanatory.
- Left click or drag throught the grid to draw stitches.
- Right click or drag to remove stitches.
- The order each stitch is placed will define the order of the GIF animation.
- Some options can be changed while drawing the project

## Development ##
- Run `grunt`  
It will watch for file changes and compress JS and SASS

## TODOs ##
[x] Add option to add rows  
[ ] Add option to add columns