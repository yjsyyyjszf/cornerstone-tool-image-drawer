import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');
const drawPath = cornerstoneTools.import('drawing/path');
const getNewContext = cornerstoneTools.import('drawing/getNewContext');


export default class ImageDrawerTool extends BaseAnnotationTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'ImageDrawer',
      supportedInteractionTypes: ['Mouse', 'Touch'],
      configuration: {
        // showMinMax: false,
        // showHounsfieldUnits: true,
      },
    };

    const initialConfiguration = Object.assign(defaultProps, props);

    super(initialConfiguration);

    this.img = new Image(300, 300);
    this.img.src = 'https://image.flaticon.com/icons/svg/2531/2531249.svg';
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
    const {canvasContext} = eventData;

    const context = getNewContext(canvasContext.canvas);


    const options = {
      color: '#ff0000',
      lineWidth: 5,
      fillStyle: 'blue',
      lineDash: [5, 15]
    };

    drawPath(context, options, ctx => {
      ctx.drawImage(this.img, 0, 0);
    });
  }
}
