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
    ]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
      },
    );
  }

  install() {
    this.yarnInstall();
  }
};
