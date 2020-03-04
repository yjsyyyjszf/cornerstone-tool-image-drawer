const cornerstone = window.cornerstone;
import cornerstoneTools from 'cornerstone-tools';

const path = cornerstoneTools.import('drawing/path');

/**
 * Draw a SVG within the bounding box defined by `corner1` and `corner2`.
 * @public
 * @method drawSVG
 * @memberof Drawing
 *
 * @param {CanvasRenderingContext2D} context - Target context
 * @param {HTMLElement} element - The DOM Element to draw on
 * @param {Image} image - The Image to draw on the canvas
 * @param {Object} corner1 - `{ x, y }` in either pixel or canvas coordinates.
 * @param {Object} corner2 - `{ x, y }` in either pixel or canvas coordinates.
 * @param {Object} corner3 - `{ x, y }` in either pixel or canvas coordinates.
 * @param {Object} options - See {@link path}
 * @param {String} [coordSystem='pixel'] - Can be "pixel" (default) or "canvas". The coordinate
 *     system of the points passed in to the function. If "pixel" then cornerstone.pixelToCanvas
 *     is used to transform the points from pixel to canvas coordinates.
 * @param {Number} initialRotation - Ellipse initial rotation
 * @returns {undefined}
 */
export default function (context, element, image, corner1, corner2, corner3, options, coordSystem, initialRotation) {
  const { isFirst } = corner3;

  if (coordSystem === 'pixel') {
    corner1 = cornerstone.pixelToCanvas(element, corner1);
    corner2 = cornerstone.pixelToCanvas(element, corner2);
    corner3 = cornerstone.pixelToCanvas(element, corner3);

    const viewport = cornerstone.getViewport(element);

    // Center of image
    const { clientWidth: width, clientHeight: height } = element;
    const { scale, translation } = viewport;

    const centerPoint = {
      x: width / 2 + translation.x * scale,
      y: height / 2 + translation.y * scale,
    };

    path(context, options, (context) => {
      context.drawImage(
        image,
        width / 2,
        height / 2,
        150,
        250
      );
    });
  }

}
