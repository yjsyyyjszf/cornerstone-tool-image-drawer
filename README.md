<div align="center">
<h1>Cornerstone Tools Plugin: Image Drawer</h1>

<p>A simple image drawer tool plugin for <a href="https://github.com/cornerstonejs/cornerstone">CornerstoneJS</a></p>
</div>

<hr />

<!-- prettier-ignore-start -->

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]
<!-- prettier-ignore-end -->

### Demo

![GIF Example](https://github.com/pierreleguen/cornerstone-tool-image-drawer/raw/gh-page/example/example.gif)

You can play with this tool using the [live example: here](https://pierreleguen.github.io/cornerstone-tool-image-drawer/)

### Usage

Nothing crazy here. This tool is a class that extends `cornerstone-tool`'s ["AnnotationdBaseTool"](https://tools.cornerstonejs.org/tool-types/#base-tool). It can be installed, added, and extended the same way as all 3rd party tools.

_Install via NPM:_

`npm install cornerstone-tool-image-drawer --save`

_Import, add, and enable:_

```js
import ImageDrawerTool from "cornerstone-tool-image-drawer";

// ...

cornerstoneTools.addTool(ImageDrawerTool);
cornerstoneTools.setToolEnabled("ImageDrawer");
```

## Resources

- [Webpack: Authoring Libraries](https://webpack.js.org/guides/author-libraries/)
- [Webpack: Externals](https://webpack.js.org/configuration/externals/)

## License

[MIT](https://github.com/QSolutionsLLC/cornerstone-tool-image-drawer/blob/master/LICENSE)
