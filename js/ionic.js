const { promises: fs } = require("fs");
const path = require("path");

async function copyDir(src, dest) {

    await fs.rm(dest, { recursive: true, force: true });

    await fs.mkdir(dest, { recursive: true });

    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}


copyDir("./vendors/ionic-app/www", "./app-files/www")