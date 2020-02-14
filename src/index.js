import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');
const drawPath = cornerstoneTools.import('drawing/path');
const getNewContext = cornerstoneTools.import('drawing/getNewContext');
const moveNewHandle = cornerstoneTools.import('manipulators/moveNewHandle');

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

  addNewMeasurement(evt) {
    const eventData = evt.detail;
    const {element, image} = eventData;

    const measurementData = this.createNewMeasurement(eventData);

    cornerstoneTools.addToolState(element, this.name, measurementData); //addToolState(element, toolType, measurementData)
    const { end } = measurementData.handles;
    cornerstone.updateImage(element);

    console.log(image);

  }

  createNewMeasurement(eventData) {
    const validEventData = eventData && eventData.currentPoints && eventData.currentPoints.image;

    if (!validEventData) {
      console.error('err: createNewMeasurement');
      return;

    }

    return {
      visible: true,
      active: true,
      color: undefined,
      invalidated: true,
      shortestDistance: 0,
      handles: {
        start: {
          x: eventData.currentPoints.image.x,
          y: eventData.currentPoints.image.y,
          highlight: true,
          active: false,
          key: 'start',
        },
        end: {
          x: eventData.currentPoints.image.x,
          y: eventData.currentPoints.image.y,
          highlight: true,
          active: true,
          key: 'end',
        },
        perpendicularPoint: {
          x: eventData.currentPoints.image.x,
          y: eventData.currentPoints.image.y,
          highlight: true,
          active: false,
          isFirst: true,
          key: 'perpendicular',
        },
        initialRotation: eventData.viewport.rotation,
        textBox: {
          active: false,
          hasMoved: false,
          movesIndependently: false,
          drawnIndependently: true,
          allowedOutsideImage: true,
          hasBoundingBox: true,
        },
      },
    };
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

  pointNearTool(element, data, coords, interactionType = 'mouse') {
    const hasStartAndEndHandles =
      data && data.handles && data.handles.start && data.handles.end;
    if (!hasStartAndEndHandles) {
      // TODO(pleguen): error handle
    }

    if (data.visible == false) {
      return false;
    }

    // const dist = interactionType === 'mouse' ? 15 : 25;
    console.log(interactionType);
  }

}
