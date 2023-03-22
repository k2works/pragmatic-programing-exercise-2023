function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask

const { series } = require("gulp");
const { default: rimraf } = require("rimraf");

const asciidoctor = {
  clean: async (cb) => {
    await rimraf("./public/docs");
    cb();
  },
  build: (cb) => {
    const fs = require("fs");
    const asciidoctor = require("@asciidoctor/core")();
    const kroki = require("asciidoctor-kroki");

    const krokiRegister = () => {
      const registry = asciidoctor.Extensions.create();
      kroki.register(registry);
      return registry;
    };

    const inputRootDir = "./docs";
    const outputRootDir = "./public/docs";
    const fileNameList = fs.readdirSync(inputRootDir);
    const docs = fileNameList.filter(RegExp.prototype.test, /.*\.adoc$/);

    docs.map((input) => {
      const file = `${inputRootDir}/${input}`;
      asciidoctor.convertFile(file, {
        safe: "safe",
        extension_registry: krokiRegister(),
        to_dir: outputRootDir,
        mkdirs: true,
      });
    });
    cb();
  },
  watch: (cb) => {
    watch("./docs/**/*.adoc", asciidoctor.build);
    cb();
  },
}

exports.docs = series(asciidoctor.clean, asciidoctor.build);