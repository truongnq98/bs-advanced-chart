var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import { isDefined, noop, hexToRGBA } from "../../utils";

var InteractiveText = function (_Component) {
	_inherits(InteractiveText, _Component);

	function InteractiveText(props) {
		_classCallCheck(this, InteractiveText);

		var _this = _possibleConstructorReturn(this, (InteractiveText.__proto__ || Object.getPrototypeOf(InteractiveText)).call(this, props));

		_this.calculateTextWidth = true;

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(InteractiveText, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    onHover = _props.onHover,
			    type = _props.type;


			if (isDefined(onHover) && isDefined(this.textWidth) && !this.calculateTextWidth) {
				var _helper = helper(this.props, moreProps, this.textWidth),
				    rect = _helper.rect;

				var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
				    x = _moreProps$mouseXY[0],
				    y = _moreProps$mouseXY[1];

				var radius = rect.height / 2;
				var arrowHeight = 10;
				if (type === "BUBBLE" && x >= rect.x - radius && y >= rect.y - rect.height - arrowHeight && x <= rect.x + rect.width && y <= rect.y) {
					return true;
				} else if (type === "TEXT" && x >= rect.x && y >= rect.y && x <= rect.x + rect.width && y <= rect.y + rect.height) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: "UNSAFE_componentWillReceiveProps",
		value: function UNSAFE_componentWillReceiveProps(nextProps) {
			this.calculateTextWidth = nextProps.text !== this.props.text || nextProps.fontStyle !== this.props.fontStyle || nextProps.fontWeight !== this.props.fontWeight || nextProps.fontSize !== this.props.fontSize || nextProps.fontFamily !== this.props.fontFamily;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props2 = this.props,
			    bgFill = _props2.bgFill,
			    bgOpacity = _props2.bgOpacity,
			    textFill = _props2.textFill,
			    fontFamily = _props2.fontFamily,
			    fontSize = _props2.fontSize,
			    fontStyle = _props2.fontStyle,
			    fontWeight = _props2.fontWeight,
			    text = _props2.text,
			    type = _props2.type;


			if (this.calculateTextWidth) {
				ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;

				var _ctx$measureText = ctx.measureText(text),
				    width = _ctx$measureText.width;

				this.textWidth = width;
				this.calculateTextWidth = false;
			}

			var _helper2 = helper(this.props, moreProps, this.textWidth),
			    x = _helper2.x,
			    y = _helper2.y,
			    rect = _helper2.rect;

			var radius = rect.height / 2;
			var arrowHeight = 10;
			var endX = rect.x + rect.width;
			var endY = rect.y - rect.height - arrowHeight;
			ctx.fillStyle = hexToRGBA(bgFill, bgOpacity);
			if (type === "TEXT") {
				ctx.beginPath();
				ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
				ctx.fillStyle = textFill;
				ctx.textBaseline = "middle";
				ctx.textAlign = "center";
				ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;
				ctx.beginPath();
				ctx.fillText(text, x, y);
			} else if (type === "BUBBLE") {
				ctx.strokeStyle = hexToRGBA(bgFill, bgOpacity);
				ctx.beginPath();
				ctx.moveTo(rect.x, rect.y - arrowHeight);
				ctx.lineTo(rect.x, rect.y);
				ctx.lineTo(rect.x + arrowHeight, rect.y - arrowHeight);
				ctx.lineTo(endX - radius, rect.y - arrowHeight);
				ctx.quadraticCurveTo(endX, rect.y - arrowHeight, endX, rect.y - arrowHeight - radius);
				ctx.lineTo(endX, endY + radius);
				ctx.quadraticCurveTo(endX, endY, endX - radius, endY);
				ctx.lineTo(rect.x, endY);
				ctx.quadraticCurveTo(rect.x - radius, endY, rect.x - radius, endY + radius);
				ctx.lineTo(rect.x - radius, rect.y - arrowHeight - radius);
				ctx.quadraticCurveTo(rect.x - radius, rect.y - arrowHeight, rect.x, rect.y - arrowHeight);
				ctx.fill();
				ctx.fillStyle = textFill;
				ctx.textBaseline = "middle";
				ctx.textAlign = "center";
				ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;
				ctx.beginPath();
				ctx.fillText(text, x + (rect.width - radius) / 2, y - arrowHeight - rect.height / 2);
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG() {
			throw new Error("svg not implemented");
		}
	}, {
		key: "render",
		value: function render() {
			var _props3 = this.props,
			    selected = _props3.selected,
			    interactiveCursorClass = _props3.interactiveCursorClass;
			var _props4 = this.props,
			    onHover = _props4.onHover,
			    onUnHover = _props4.onUnHover;
			var _props5 = this.props,
			    onDragStart = _props5.onDragStart,
			    onDrag = _props5.onDrag,
			    onDragComplete = _props5.onDragComplete;


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

				drawOn: ["mousemove", "mouseleave", "pan", "drag"]
			});
		}
	}]);

	return InteractiveText;
}(Component);

function helper(props, moreProps, textWidth) {
	var position = props.position,
	    fontSize = props.fontSize;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;

	var _position = _slicedToArray(position, 2),
	    xValue = _position[0],
	    yValue = _position[1];

	var x = xScale(xValue);
	var y = yScale(yValue);
	var rect = {};
	if (props.type === "BUBBLE") {
		rect = {
			x: x,
			y: y,
			width: textWidth + fontSize * 2,
			height: fontSize * 2
		};
	} else if (props.type === "TEXT") {
		rect = {
			x: x - textWidth / 2 - fontSize,
			y: y - fontSize,
			width: textWidth + fontSize * 2,
			height: fontSize * 2
		};
	}

	return {
		x: x, y: y, rect: rect
	};
}

InteractiveText.propTypes = {
	type: PropTypes.oneOf(["TEXT", // extends from -Infinity to +Infinity
	"BUBBLE"] // extends to +/-Infinity in one direction
	),
	bgFill: PropTypes.string.isRequired,
	bgOpacity: PropTypes.number.isRequired,

	textFill: PropTypes.string.isRequired,
	fontFamily: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	fontStyle: PropTypes.string.isRequired,

	text: PropTypes.string.isRequired,

	onDragStart: PropTypes.func.isRequired,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,

	defaultClassName: PropTypes.string,
	interactiveCursorClass: PropTypes.string,

	tolerance: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired
};

InteractiveText.defaultProps = {
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,

	fontWeight: "normal", // standard dev

	strokeWidth: 1,
	tolerance: 4,
	selected: false
};

export default InteractiveText;
//# sourceMappingURL=InteractiveText.js.map