import cornerstone from "cornerstone-core";
import { import as csTools, toolColors } from "cornerstone-tools";

const BaseTool = csTools("base/BaseTool");
const drawTextBox = csTools("drawing/drawTextBox");
const drawPath = csTools("drawing/path");
const getNewContext = csTools("drawing/getNewContext");

export default class ImageDrawer extends BaseTool {
  constructor(configuration = {}) {
    const defaultConfig = {
      name: "ImageDrawer",
      mixins: ["enabledOrDisabledBinaryTool"]
    };

    const initialConfiguration = Object.assign(defaultConfig, configuration);

    super(initialConfiguration);

    this.initialConfigxuration = initialConfiguration;

    this.img = new Image(300, 300);
    this.img.src = "https://image.flaticon.com/icons/svg/2531/2531249.svg";
  }

  enabledCallback() {
    this._forceImageUpdate();
  }

  disabledCallback() {
    this._forceImageUpdate();
  }

  _forceImageUpdate() {
    const enabledElement = cornerstone.getEnabledElement(this.element);
    const hasImageToUpdate = enabledElement.image;

    if (hasImageToUpdate) {
      cornerstone.updateImage(this.element, true);
    }
  }

  renderToolData(evt) {
    const eventData = evt.detail;
    const { canvasContext, image } = eventData;
    const stats = image.stats;

    const textLines = [];
    const context = getNewContext(canvasContext.canvas);
    const color = toolColors.getToolColor();

    Object.keys(stats).forEach(function(key) {
      const text = `${key} : ${stats[key]}`;

      textLines.push(text);
    });

    drawTextBox(context, textLines, 0, 0, color);

    const options = {
      color: "#ff0000",
      lineWidth: 5,
      fillStyle: "blue",
      lineDash: [5, 15]
    };
    /*drawPath(context, options, ctx => {
      ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
    });*/

    drawPath(context, options, ctx => {
      ctx.drawImage(this.img, 0, 0);
    });
  }
}
