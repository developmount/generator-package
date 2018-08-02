const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your package name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'exportName',
        message: 'Name of the umd export',
        default: this.appname,
      },
    ]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props,
    );
    this.fs.copyTpl(
      this.templatePath('rollup.config.js'),
      this.destinationPath('rollup.config.js'),
      this.props,
    );
    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'),
      {},
    );
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      {},
    );
  }

  install() {
    this.yarnInstall();
  }
};
