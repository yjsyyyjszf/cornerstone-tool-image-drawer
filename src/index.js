// import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

const { cornerstone } = window;

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');
const drawPath = cornerstoneTools.import('drawing/path');
const getNewContext = cornerstoneTools.import('drawing/getNewContext');
const moveNewHandle = cornerstoneTools.import('manipulators/moveNewHandle');
const anyHandlesOutsideImage = cornerstoneTools.import(
  'manipulators/anyHandlesOutsideImage'
);
const EVENTS = cornerstoneTools.EVENTS;

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

  addNewMeasurement(evt) {
    const eventData = evt.detail;
    const {element, image} = eventData;

    const measurementData = this.createNewMeasurement(eventData);

    cornerstoneTools.addToolState(element, this.name, measurementData); //addToolState(element, toolType, measurementData)
    const {end} = measurementData.handles;

    cornerstone.updateImage(this.element);


    moveNewHandle(
      eventData,
      this.name,
      measurementData,
      end,
      {},
      'mouse',
      () => {
        if (anyHandlesOutsideImage(eventData, measurementData.handles)) {
          // Delete the measurement
          cornerstoneTools.removeToolState(element, this.name, measurementData);
        } else {
          const center = getCenter(measurementData.handles);

          measurementData.handles.perpendicularPoint.x = center.x;
          measurementData.handles.perpendicularPoint.y = center.y;
          measurementData.handles.perpendicularPoint.isFirst = false;
          this.updateCachedStats(image, element, measurementData);
          cornerstone.triggerEvent(
            element,
            EVENTS.MEASUREMENT_COMPLETED,
            measurementData
          );
        }
      }
    );
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

    if (data.visible === false) {
      return false;
    }

    // const dist = interactionType === 'mouse' ? 15 : 25;
  }

  mouseMoveCallback(evt) {
    const eventData = evt.detail;
    const { element } = eventData;

    const toolData = cornerstoneTools.getToolState(element, this.name);

    if (!toolData) {
      return
    }

    // We have tool data, search through all data
    // And see if we can activate a handle
    let imageNeedsUpdate = false;

    // TODO(pleguen): implement functions when mouse moves over the canvas
  }

  handleSelectedCallback(evt) {
    const eventData = evt.detail;
    const { element } = eventData;
    console.log('handleSelectedCallback', element);
  }

}

const getCenter = (handles) => {
  const {start, end} = handles;
  const w = Math.abs(start.x - end.x);
  const h = Math.abs(start.y - end.y);
  const xMin = Math.min(start.x, end.x);
  const yMin = Math.min(start.y, end.y);

  return {
    x: xMin + w / 2,
    y: yMin + h / 2,
  };
};
