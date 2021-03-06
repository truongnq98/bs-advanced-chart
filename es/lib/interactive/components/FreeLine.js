var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import { isDefined, noop, hexToRGBA, getStrokeDasharray, strokeDashTypes } from "../../utils";

var StraightLine = function (_Component) {
	_inherits(StraightLine, _Component);

	function StraightLine(props) {
		_classCallCheck(this, StraightLine);

		var _this = _possibleConstructorReturn(this, (StraightLine.__proto__ || Object.getPrototypeOf(StraightLine)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(StraightLine, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    tolerance = _props.tolerance,
			    onHover = _props.onHover;


			if (isDefined(onHover)) {
				var positionList = this.props.positionList;
				var mouseXY = moreProps.mouseXY,
				    xScale = moreProps.xScale,
				    yScale = moreProps.chartConfig.yScale;

				for (var i = 0; i < positionList.length - 1; i++) {
					var x1Value = positionList[i][0];
					var y1Value = positionList[i][1];
					var x2Value = positionList[i + 1][0];
					var y2Value = positionList[i + 1][1];
					var value = isHovering({
						x1Value: x1Value, y1Value: y1Value,
						x2Value: x2Value, y2Value: y2Value,
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					if (value) {
						return true;
					}
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props2 = this.props,
			    stroke = _props2.stroke,
			    strokeWidth = _props2.strokeWidth,
			    strokeOpacity = _props2.strokeOpacity,
			    positionList = _props2.positionList;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale;

			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.beginPath();
			ctx.moveTo(xScale(positionList[0][0]), yScale(positionList[0][1]));
			positionList.slice(1).forEach(function (element) {
				ctx.lineTo(xScale(element[0]), yScale(element[1]));
			});
			ctx.stroke();
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props3 = this.props,
			    stroke = _props3.stroke,
			    strokeWidth = _props3.strokeWidth,
			    strokeOpacity = _props3.strokeOpacity,
			    strokeDasharray = _props3.strokeDasharray;


			var lineWidth = strokeWidth;

			var _helper = helper(this.props, moreProps),
			    x1 = _helper.x1,
			    y1 = _helper.y1,
			    x2 = _helper.x2,
			    y2 = _helper.y2;

			return React.createElement("line", {
				x1: x1, y1: y1, x2: x2, y2: y2,
				stroke: stroke, strokeWidth: lineWidth,
				strokeDasharray: getStrokeDasharray(strokeDasharray),
				strokeOpacity: strokeOpacity });
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    selected = _props4.selected,
			    interactiveCursorClass = _props4.interactiveCursorClass;
			var _props5 = this.props,
			    onDragStart = _props5.onDragStart,
			    onDrag = _props5.onDrag,
			    onDragComplete = _props5.onDragComplete,
			    onHover = _props5.onHover,
			    onUnHover = _props5.onUnHover;


			return React.createElement(GenericChartComponent, {
				isHover: this.isHover,

				svgDraw: this.renderSVG,
				canvasToDraw: getMouseCanvas,
				canvasDraw: this.drawOnCanvas,

				interactiveCursorClass: interactiveCursorClass,
				selected: selected,

				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,

				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return StraightLine;
}(Component);

export function isHovering2(start, end, _ref, tolerance) {
	var _ref2 = _slicedToArray(_ref, 2),
	    mouseX = _ref2[0],
	    mouseY = _ref2[1];

	var m = getSlope(start, end);

	if (isDefined(m)) {
		var b = getYIntercept(m, end);
		var y = m * mouseX + b;
		return mouseY < y + tolerance && mouseY > y - tolerance && mouseX > Math.min(start[0], end[0]) - tolerance && mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1]) && mouseY <= Math.max(start[1], end[1]) && mouseX < start[0] + tolerance && mouseX > start[0] - tolerance;
	}
}

export function isHovering(_ref3) {
	var x1Value = _ref3.x1Value,
	    y1Value = _ref3.y1Value,
	    x2Value = _ref3.x2Value,
	    y2Value = _ref3.y2Value,
	    mouseXY = _ref3.mouseXY,
	    tolerance = _ref3.tolerance,
	    xScale = _ref3.xScale,
	    yScale = _ref3.yScale;


	var line = generateLine({
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	});

	var start = [xScale(line.x1), yScale(line.y1)];
	var end = [xScale(line.x2), yScale(line.y2)];

	var m = getSlope(start, end);

	var _mouseXY = _slicedToArray(mouseXY, 2),
	    mouseX = _mouseXY[0],
	    mouseY = _mouseXY[1];

	if (isDefined(m)) {
		var b = getYIntercept(m, end);
		var y = m * mouseX + b;

		return mouseY < y + tolerance && mouseY > y - tolerance && mouseX > Math.min(start[0], end[0]) - tolerance && mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1]) && mouseY <= Math.max(start[1], end[1]) && mouseX < start[0] + tolerance && mouseX > start[0] - tolerance;
	}
}

function helper(props, moreProps) {
	var x1Value = props.x1Value,
	    x2Value = props.x2Value,
	    y1Value = props.y1Value,
	    y2Value = props.y2Value,
	    type = props.type;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;


	var modLine = generateLine({
		type: type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	});

	var x1 = xScale(modLine.x1);
	var y1 = yScale(modLine.y1);
	var x2 = xScale(modLine.x2);
	var y2 = yScale(modLine.y2);

	return {
		x1: x1, y1: y1, x2: x2, y2: y2
	};
}

export function getSlope(start, end) {
	var m /* slope */ = end[0] === start[0] ? undefined : (end[1] - start[1]) / (end[0] - start[0]);
	return m;
}
export function getYIntercept(m, end) {
	var b /* y intercept */ = -1 * m * end[0] + end[1];
	return b;
}

export function generateLine(_ref4) {
	var start = _ref4.start,
	    end = _ref4.end,
	    xScale = _ref4.xScale,
	    yScale = _ref4.yScale;

	var m /* slope */ = getSlope(start, end);
	// console.log(end[0] - start[0], m)
	var b /* y intercept */ = getYIntercept(m, start);
	return getLineCoordinates({
		start: start, end: end, xScale: xScale, yScale: yScale, m: m, b: b
	});
}

function getLineCoordinates(_ref5) {
	var start = _ref5.start,
	    end = _ref5.end;

	var _start = _slicedToArray(start, 2),
	    x1 = _start[0],
	    y1 = _start[1];

	var _end = _slicedToArray(end, 2),
	    x2 = _end[0],
	    y2 = _end[1];

	if (end[0] === start[0]) {
		return {
			x1: x1,
			y1: start[1],
			x2: x1,
			y2: end[1]
		};
	}

	return {
		x1: x1, y1: y1,
		x2: x2, y2: y2
	};
}

StraightLine.propTypes = {
	positionList: PropTypes.arrayOf(PropTypes.any).isRequired,
	interactiveCursorClass: PropTypes.string,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),

	onEdge1Drag: PropTypes.func.isRequired,
	onEdge2Drag: PropTypes.func.isRequired,
	onDragStart: PropTypes.func.isRequired,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,

	defaultClassName: PropTypes.string,

	r: PropTypes.number.isRequired,
	withEdge: PropTypes.bool.isRequired,
	children: PropTypes.func.isRequired,
	tolerance: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired
};

StraightLine.defaultProps = {
	onEdge1Drag: noop,
	onEdge2Drag: noop,
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,

	edgeStrokeWidth: 3,
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	r: 10,
	withEdge: false,
	strokeWidth: 1,
	strokeDasharray: "Solid",
	children: noop,
	tolerance: 7,
	selected: false,
	fill: "#8AAFE2",
	fillOpacity: 0.5
};

export default StraightLine;
//# sourceMappingURL=FreeLine.js.map