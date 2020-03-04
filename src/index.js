// import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import drawSvg from './drawSvg';

const { cornerstone } = window;

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');
const draw = cornerstoneTools.import('drawing/draw');
const setShadow = cornerstoneTools.import('drawing/setShadow')
const getPixelSpacing = cornerstoneTools.import('util/getPixelSpacing');
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

    this.img = new Image();
    this.img.src = 'https://svgshare.com/i/HzL.svg';
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
    const toolData = cornerstoneTools.getToolState(evt.currentTarget, this.name);
    if (!toolData) {
      return
    }

    const eventData = evt.detail;
    const { image, element } = eventData;
    const context = getNewContext(eventData.canvasContext.canvas);
    const { handleRadius, drawHandlesOnHover } = this.configuration;
    const { rowPixelSpacing, colPixelSpacing } = getPixelSpacing(image);

    // Meta
    const seriesModule =
      cornerstone.metaData.get('generalSeriesModule', image.imageId) || {};

    // Pixel Spacing
    const modality = seriesModule.modality;
    const hasPixelSpacing = rowPixelSpacing && colPixelSpacing;

    draw(context, (context) => {
      for (let i = 0; i < toolData.data.length; i++) {
        const data = toolData.data[i];

        if (data.visible === false) {
          continue;
        }

        const color = cornerstoneTools.toolColors.getColorIfActive(data);
        const handleOptions = {
          color,
          handleRadius,
          drawHandlesIfActive: drawHandlesOnHover,
        };

        setShadow(context, this.configuration);

        drawSvg(context, element, this.img, data.handles.start, data.handles.end,data.handles.perpendicularPoint, {color}, 'pixel', data.handles.initialRotation);
      }
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
