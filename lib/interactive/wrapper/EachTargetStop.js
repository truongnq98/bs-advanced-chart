"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../../utils");

var _ChartDataUtil = require("../../utils/ChartDataUtil");

var _utils2 = require("../utils");

var _ClickableCircle = require("../components/ClickableCircle");

var _ClickableCircle2 = _interopRequireDefault(_ClickableCircle);

var _ChannelWithArea = require("../components/ChannelWithArea");

var _ChannelWithArea2 = _interopRequireDefault(_ChannelWithArea);

var _Text = require("../components/Text");

var _Text2 = _interopRequireDefault(_Text);

var _StraightLine = require("../components/StraightLine");

var _StraightLine2 = _interopRequireDefault(_StraightLine);

var _HoverTextNearMouse = require("../components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EachTargetStop = function (_Component) {
	_inherits(EachTargetStop, _Component);

	function EachTargetStop(props) {
		_classCallCheck(this, EachTargetStop);

		var _this = _possibleConstructorReturn(this, (EachTargetStop.__proto__ || Object.getPrototypeOf(EachTargetStop)).call(this, props));

		_this.handleLine1Edge1Drag = _this.handleLine1Edge1Drag.bind(_this);
		_this.handleLine1Edge2Drag = _this.handleLine1Edge2Drag.bind(_this);

		_this.handleDragStart = _this.handleDragStart.bind(_this);
		_this.handleChannelDrag = _this.handleChannelDrag.bind(_this);

		_this.handleChannelHeightChange = _this.handleChannelHeightChange.bind(_this);
		_this.handleChannelHeightLongChange = _this.handleChannelHeightLongChange.bind(_this);
		_this.handleChannelHeightShortChange = _this.handleChannelHeightShortChange.bind(_this);

		_this.getEdgeCircle = _this.getEdgeCircle.bind(_this);
		_this.handleHover = _this.handleHover.bind(_this);

		_this.isHover = _utils2.isHover.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			hover: false
		};
		return _this;
	}

	function renderSVG(props) {
		var className = props.className;
		var edge = helper(props);
		if (edge === null) return null;
		var line = void 0,
			coordinateBase = void 0,
			coordinate = void 0;
	
		if ((0, _utils.isDefined)(edge.line)) {
			line = _react2.default.createElement("line", {
				className: "react-stockcharts-cross-hair",
				strokeOpacity: edge.line.opacity,
				stroke: edge.line.stroke,
				strokeDasharray: (0, _utils.getStrokeDasharray)(edge.line.strokeDasharray),
				x1: edge.line.x1,
				y1: edge.line.y1,
				x2: edge.line.x2,
				y2: edge.line.y2
			});
		}
		if ((0, _utils.isDefined)(edge.coordinateBase)) {
			var _edge$coordinateBase = edge.coordinateBase,
				rectWidth = _edge$coordinateBase.rectWidth,
				rectHeight = _edge$coordinateBase.rectHeight,
				arrowWidth = _edge$coordinateBase.arrowWidth;
	
	
			var path = edge.orient === "left" ? "M0,0L0," + rectHeight + "L" + rectWidth + "," + rectHeight + "L" + (rectWidth + arrowWidth) + ",10L" + rectWidth + ",0L0,0L0,0" : "M0," + arrowWidth + "L" + arrowWidth + "," + rectHeight + "L" + (rectWidth + arrowWidth) + "," + rectHeight + "L" + (rectWidth + arrowWidth) + ",0L" + arrowWidth + ",0L0," + arrowWidth;
			
			coordinateBase = _react2.default.createElement("rect", {
				key: 1,
				className: "react-stockchart-text-background",
				x: 544,
				y: 169,
				height: 100,
				width: 100,
				fill: edge.coordinateBase.fill,
				opacity: edge.coordinateBase.opacity
			});
	
			coordinate = _react2.default.createElement(
				"text",
				{
					key: 2,
					x: 544,
					y: 169,
					textAnchor: edge.coordinate.textAnchor,
					fontFamily: edge.coordinate.fontFamily,
					fontSize: edge.coordinate.fontSize,
					dy: ".32em",
					fill: edge.coordinate.textFill
				},
				edge.coordinate.displayCoordinate
			);
		}
		return _react2.default.createElement(
			"g",
			{ className: className },
			// line,
			coordinateBase,
			coordinate
		);
	}

	function helper(props) {
		var displayCoordinate = props.coordinate,
			show = props.show,
			type = props.type,
			orient = props.orient,
			edgeAt = props.edgeAt,
			hideLine = props.hideLine,
			lineStrokeDasharray = [];
		var fill = props.fill,
			opacity = 1,
			fontFamily = props.fontFamily,
			fontSize = props.fontSize,
			textFill = props.textFill,
			lineStroke = props.lineStroke,
			lineOpacity = props.lineOpacity;
		var stroke = props.stroke,
			strokeOpacity = 1,
			strokeWidth = props.strokeWidth;
		var arrowWidth = props.arrowWidth,
			rectWidth = props.rectWidth,
			rectHeight = props.rectHeight,
			rectRadius = props.rectRadius;
		var x1 = props.x1,
			y1 = props.y1,
			x2 = props.x2,
			y2 = props.y2,
			dx = props.dx;
	
	
		if (!show) return null;
	
		var coordinateBase = void 0,
			coordinate = void 0;
		if ((0, _utils.isDefined)(displayCoordinate)) {
			var textAnchor = "middle"; // TODO: Below it is necessary to implement logic for the possibility of alignment from the right or from the left.
	
			var edgeXRect = void 0,
				edgeYRect = void 0,
				edgeXText = void 0,
				edgeYText = void 0;
	
			if (type === "horizontal") {
				edgeXRect = dx + (orient === "right" ? edgeAt + 1 : edgeAt - rectWidth - 1);
				edgeYRect = y1 - rectHeight / 2 - strokeWidth;
				edgeXText = dx + (orient === "right" ? edgeAt + rectWidth / 2 : edgeAt - rectWidth / 2);
				edgeYText = y1;
			} else {
				var dy = orient === "bottom" ? strokeWidth - 1 : -strokeWidth + 1;
				edgeXRect = x1 - rectWidth / 2;
				edgeYRect = (orient === "bottom" ? edgeAt : edgeAt - rectHeight) + dy;
				edgeXText = x1;
				edgeYText = (orient === "bottom" ? edgeAt + rectHeight / 2 : edgeAt - rectHeight / 2) + dy;
			}
	
			coordinateBase = {
				edgeXRect: edgeXRect,
				edgeYRect: edgeYRect,
				rectHeight: rectHeight + strokeWidth,
				rectWidth: rectWidth,
				rectRadius: rectRadius,
				fill: "#fff",
				opacity: opacity,
				arrowWidth: arrowWidth,
				stroke: "#fff",
				strokeOpacity: strokeOpacity,
				strokeWidth: strokeWidth
			};
			coordinate = {
				edgeXText: edgeXText,
				edgeYText: edgeYText,
				textAnchor: textAnchor,
				fontFamily: fontFamily,
				fontSize: fontSize,
				textFill: "#fff",
				displayCoordinate: "ok"
			};
		}
	
		var line = hideLine ? undefined : {
			opacity: lineOpacity,
			stroke: lineStroke,
			strokeDasharray: lineStrokeDasharray,
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2
		};
	
		return {
			coordinateBase: coordinateBase,
			coordinate: coordinate,
			line: line,
			orient: orient
		};
	}
	_createClass(EachTargetStop, [{
		key: "handleHover",
		value: function handleHover(moreProps) {
			if (this.state.hover !== moreProps.hovering) {
				this.setState({
					hover: moreProps.hovering
				});
			}
		}
	}, {
		key: "handleDragStart",
		value: function handleDragStart() {
			var _props = this.props,
				startXY = _props.startXY,
				endXY = _props.endXY,
				dy = _props.dy,
				dLong = _props.dLong,
				dShort = _props.dShort;


			this.dragStart = {
				startXY: startXY, endXY: endXY, dy: dy, dLong: dLong, dShort: dShort,
			};
		}
	}, {
		key: "handleChannelDrag",
		value: function handleChannelDrag(moreProps) {
			var _props2 = this.props,
				index = _props2.index,
				onDrag = _props2.onDrag;
			var _dragStart = this.dragStart,
				startXY = _dragStart.startXY,
				endXY = _dragStart.endXY;
			var xScale = moreProps.xScale,
				yScale = moreProps.chartConfig.yScale,
				xAccessor = moreProps.xAccessor,
				fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
				mouseXY = moreProps.mouseXY;

			var x1 = xScale(startXY[0]);
			var y1 = yScale(startXY[1]);
			var x2 = xScale(endXY[0]);
			var y2 = yScale(endXY[1]);

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var newX1Value = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
			var newY1Value = yScale.invert(y1 - dy);
			var newX2Value = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
			var newY2Value = yScale.invert(y2 - dy);

			// const newDy = newY2Value - endXY[1] + this.dragStart.dy;

			onDrag(index, {
				startXY: [newX1Value, newY1Value],
				endXY: [newX2Value, newY2Value],
				dy: this.dragStart.dy,
				dLong: this.dragStart.dLong > 0 ? this.dragStart.dLong : 0,
				dShort: this.dragStart.dShort < 0 ? this.dragStart.dShort : 0,
			});
		}
	}, {
		key: "handleLine1Edge1Drag",
		value: function handleLine1Edge1Drag(moreProps) {
			var _props3 = this.props,
				index = _props3.index,
				onDrag = _props3.onDrag;
			var startXY = this.dragStart.startXY;
			var startPos = moreProps.startPos,
				mouseXY = moreProps.mouseXY,
				xAccessor = moreProps.xAccessor,
				xScale = moreProps.xScale,
				fullData = moreProps.fullData,
				yScale = moreProps.chartConfig.yScale;


			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var x1 = xScale(startXY[0]);
			var y1 = yScale(startXY[1]);

			var newX1Value = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);

			onDrag(index, {
				startXY: [newX1Value, this.dragStart.startXY[1]],
				endXY: this.dragStart.endXY,
				dy: this.dragStart.dy,
				dLong: this.dragStart.dLong > 0 ? this.dragStart.dLong : 0,
				dShort: this.dragStart.dShort < 0 ? this.dragStart.dShort : 0,
			});
		}
	}, {
		key: "handleLine1Edge2Drag",
		value: function handleLine1Edge2Drag(moreProps) {
			var _props4 = this.props,
				index = _props4.index,
				onDrag = _props4.onDrag;
			var endXY = this.dragStart.endXY;
			var startPos = moreProps.startPos,
				mouseXY = moreProps.mouseXY,
				xAccessor = moreProps.xAccessor,
				xScale = moreProps.xScale,
				fullData = moreProps.fullData,
				yScale = moreProps.chartConfig.yScale;

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var x1 = xScale(endXY[0]);
			var y1 = _props4.endXY[1];

			var newX1Value = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);

			onDrag(index, {
				startXY: this.dragStart.startXY,
				endXY: [newX1Value, this.dragStart.endXY[1]],
				dy: this.dragStart.dy,
				dLong: this.dragStart.dLong > 0 ? this.dragStart.dLong : 0,
				dShort: this.dragStart.dShort < 0 ? this.dragStart.dShort : 0,
			});
		}
	}, {
		key: "handleChannelHeightChange",
		value: function handleChannelHeightChange(moreProps) {
			var _props5 = this.props,
				index = _props5.index,
				dLong = _props5.dLong,
				dShort = _props5.dShort,
				onDrag = _props5.onDrag;
			var _dragStart2 = this.dragStart,
				startXY = _dragStart2.startXY,
				endXY = _dragStart2.endXY;
			var yScale = moreProps.chartConfig.yScale;
			var startPos = moreProps.startPos,
				mouseXY = moreProps.mouseXY;
			var y2 = yScale(endXY[1]);

			var dy = startPos[1] - mouseXY[1];

			var newY2Value = yScale.invert(y2 - dy);

			var newDy = newY2Value - endXY[1] + this.dragStart.dy;

			onDrag(index, {
				startXY: startXY,
				endXY: endXY,
				dy: newDy,
				dLong: this.dragStart.dLong > 0 ? this.dragStart.dLong : 0,
				dShort: this.dragStart.dShort < 0 ? this.dragStart.dShort : 0,
			});
		}
	}, {
		key: "handleChannelHeightLongChange",
		value: function handleChannelHeightChange(moreProps) {
			var _props5 = this.props,
				index = _props5.index,
				// dLong = _props5.dLong,
				// dShort = _props5.dShort,
				onDrag = _props5.onDrag;
			var _dragStart2 = this.dragStart,
				startXY = _dragStart2.startXY,
				endXY = _dragStart2.endXY;
			var yScale = moreProps.chartConfig.yScale;
			var startPos = moreProps.startPos,
				mouseXY = moreProps.mouseXY;

			var y2 = yScale(endXY[1]);

			var dLong = startPos[1] - mouseXY[1];

			var newY2Value = yScale.invert(y2 - dLong);

			var newDy = newY2Value - endXY[1] + this.dragStart.dLong;

			onDrag(index, {
				startXY: startXY,
				endXY: endXY,
				dLong: newDy > 0 ? newDy : 0,
				dShort: this.dragStart.dShort < 0 ? this.dragStart.dShort : 0,
			});
		}
	}, {
		key: "handleChannelHeightShortChange",
		value: function handleChannelHeightChange(moreProps) {
			var _props5 = this.props,
				index = _props5.index,
				onDrag = _props5.onDrag;
			var _dragStart2 = this.dragStart,
				startXY = _dragStart2.startXY,
				endXY = _dragStart2.endXY;
			var yScale = moreProps.chartConfig.yScale;
			var startPos = moreProps.startPos,
				mouseXY = moreProps.mouseXY;


			var y2 = yScale(endXY[1]);

			var dShort = startPos[1] - mouseXY[1];

			var newY2Value = yScale.invert(y2 - dShort);

			var newDy = newY2Value - endXY[1] + this.dragStart.dShort;

			onDrag(index, {
				startXY: startXY,
				endXY: endXY,
				dShort: newDy < 0 ? newDy : 0,
				dLong: this.dragStart.dLong > 0 ? this.dragStart.dLong : 0,
			});
		}
	}, {
		key: "getEdgeCircle",
		value: function getEdgeCircle(_ref) {
			var xy = _ref.xy,
				dragHandler = _ref.dragHandler,
				cursor = _ref.cursor,
				fill = _ref.fill,
				edge = _ref.edge;
			var hover = this.state.hover;
			var appearance = this.props.appearance;
			var edgeStroke = appearance.edgeStroke,
				edgeStrokeWidth = appearance.edgeStrokeWidth,
				r = appearance.r;
			var selected = this.props.selected;
			var onDragComplete = this.props.onDragComplete;


			return _react2.default.createElement(_ClickableCircle2.default, {
				ref: this.saveNodeType(edge),

				show: selected || hover,
				cx: xy[0],
				cy: xy[1],
				r: r,
				fill: fill,
				stroke: edgeStroke,
				strokeWidth: edgeStrokeWidth,
				interactiveCursorClass: cursor,

				onDragStart: this.handleDragStart,
				onDrag: dragHandler,
				onDragComplete: onDragComplete
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _props6 = this.props,
				startXY = _props6.startXY,
				endXY = _props6.endXY,
				dy = _props6.dy,
				dLong = _props6.dLong,
				dShort = _props6.dShort;
			var priceFormat = _props6.priceFormat;
			var percentFormat = _props6.percentFormat;
			var nightMode = _props6.nightMode;

			var _props7 = this.props,
				interactive = _props7.interactive,
				hoverText = _props7.hoverText,
				appearance = _props7.appearance;
			var edgeFill = appearance.edgeFill,
				edgeFill2 = appearance.edgeFill2,
				stroke = appearance.stroke,
				strokeWidth = appearance.strokeWidth,
				strokeOpacity = appearance.strokeOpacity,
				fill = appearance.fill,
				fillOpacity = appearance.fillOpacity;
			var selected = this.props.selected;
			var onDragComplete = this.props.onDragComplete;
			var hover = this.state.hover;

			var hoverTextEnabled = hoverText.enable,
				restHoverTextProps = _objectWithoutProperties(hoverText, ["enable"]);

			var hoverHandler = interactive ? { onHover: this.handleHover, onUnHover: this.handleHover } : {};

			var line1Edge = (0, _utils.isDefined)(startXY) && (0, _utils.isDefined)(endXY) ? _react2.default.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: startXY,
					dragHandler: this.handleLine1Edge1Drag,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "line1edge1"
				}),
				this.getEdgeCircle({
					xy: endXY,
					dragHandler: this.handleLine1Edge2Drag,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "line1edge2"
				})
			) : null;
			var line2Edge = (0, _utils.isDefined)(dy) ? _react2.default.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: [startXY[0], startXY[1] + dy],
					dragHandler: this.handleChannelHeightChange,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "line2edge1"
				}),
				this.getEdgeCircle({
					xy: [endXY[0], endXY[1] + dy],
					dragHandler: this.handleChannelHeightChange,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "line2edge2"
				})
			) : null;
			var lineLongEdge = (0, _utils.isDefined)(dLong) ? _react2.default.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: [startXY[0], startXY[1] + dLong],
					dragHandler: this.handleChannelHeightLongChange,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "line2edge1"
				}),
				this.getEdgeCircle({
					xy: [endXY[0], endXY[1] + dLong],
					dragHandler: this.handleChannelHeightLongChange,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "line2edge2"
				})
			) : null;
			var lineShortEdge = (0, _utils.isDefined)(dShort) ? _react2.default.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: [startXY[0], startXY[1] + dShort],
					dragHandler: this.handleChannelHeightShortChange,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "line2edge1"
				}),
				this.getEdgeCircle({
					xy: [endXY[0], endXY[1] + dShort],
					dragHandler: this.handleChannelHeightShortChange,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "line2edge2"
				})
			) : null;
			var dir = -1.3;

			var xyProvider = function xyProvider(_ref) {
				var xScale = _ref.xScale,
					chartConfig = _ref.chartConfig;
				var yScale = chartConfig.yScale;

				var x = xScale(startXY[0]) + 10;
				var y = yScale(startXY[1]) + dir * 4;
				return [x, y];
			};
			var xyProviderLong = function xyProvider(_ref) {
				var xScale = _ref.xScale,
					chartConfig = _ref.chartConfig;
				var yScale = chartConfig.yScale;

				var x = xScale(startXY[0]) + 10;
				var y = yScale(startXY[1] + dLong) + dir * 4;
				return [x, y];
			};
			var xyProviderShort = function xyProvider(_ref) {
				var xScale = _ref.xScale,
					chartConfig = _ref.chartConfig;
				var yScale = chartConfig.yScale;

				var x = xScale(startXY[0]) + 10;
				var y = yScale(startXY[1] + dShort) + dir * 4 + 20;
				return [x, y];
			};
			var text = ``;
			var textLong = ``;
			var textShort = ``;
			var fillText = nightMode ? '#fff' : '#000'
			if (priceFormat && percentFormat) {
				text = `Open: ${priceFormat(startXY[1])}`
				textLong = `Target: ${priceFormat(startXY[1] + dLong)} (${percentFormat(dLong / startXY[1])})`;
				textShort = `Stop: ${priceFormat(startXY[1] + dShort)} (${percentFormat(-dShort / startXY[1])})`;
			}
			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(_ChannelWithArea2.default, _extends({
					ref: this.saveNodeType("channel"),
					selected: selected || hover

				}, hoverHandler, {
					startXY: startXY,
					endXY: endXY,
					dy: dLong,
					stroke: 'transparent',
					strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
					strokeOpacity: strokeOpacity,
					fill: '#009688',
					fillOpacity: 0.2,
					interactiveCursorClass: "react-stockcharts-move-cursor",

					onDragStart: this.handleDragStart,
					onDrag: this.handleChannelDrag,
					onDragComplete: onDragComplete
				})),
				_react2.default.createElement(_ChannelWithArea2.default, _extends({
					ref: this.saveNodeType("channel"),
					selected: selected || hover
				}, hoverHandler, {
					startXY: startXY,
					endXY: endXY,
					dy: dShort,
					stroke: 'transparent',
					strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
					strokeOpacity: strokeOpacity,
					fill: '#F44336',
					fillOpacity: 0.2,
					interactiveCursorClass: "react-stockcharts-move-cursor",

					onDragStart: this.handleDragStart,
					onDrag: this.handleChannelDrag,
					onDragComplete: onDragComplete
				})),
				_react2.default.createElement(
					_Text2.default,
					{
						selected: selected
						/* eslint-disable */
						, xyProvider: xyProvider
						/* eslint-enable */
						, fontFamily: 'Arial',
						fontSize: 12,
						fill: fillText
					},
					text
				),			
				// _react2.default.createElement(
				// 	_BackgroundText2.default,
				// 	{
				// 		// selected: selected,
				// 		/* eslint-disable */
				// 		x: xyProvider[0],
				// 		y: xyProvider[1]
				// 		/* eslint-enable */
				// 		, fontFamily: 'Arial',
				// 		fontSize: 14,
				// 		fill: '#fff'
				// 	},
				// 	text
				// ),
				// renderSVG({
				// 	arrowWidth: 0,
				// 	coordinate: "60,470.80",
				// 	edgeAt: 952,
				// 	fill: "#fff",
				// 	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
				// 	fontSize: "12",
				// 	lineStroke: "#fff",
				// 	orient: "right",
				// 	rectHeight: 20,
				// 	rectWidth: 50,
				// 	show: true,
				// 	stroke: undefined,
				// 	textFill: "#FFFFFF",
				// 	type: "horizontal",
				// 	x1: startXY[0],
				// 	x2: endXY[0],
				// 	y1: startXY[1],
				// 	y2: endXY[1],
				// 	dx: 0,
				// 	strokeWidth: 200,
				// 	rectRadius: 5,

				// }),
				_react2.default.createElement(
					_Text2.default,
					{
						selected: selected
						/* eslint-disable */
						, xyProvider: xyProviderLong
						/* eslint-enable */
						, fontFamily: 'Arial',
						fontSize: 12,
						fill: fillText
					},
					textLong
				),
				_react2.default.createElement(
					_Text2.default,
					{
						selected: selected
						/* eslint-disable */
						, xyProvider: xyProviderShort
						/* eslint-enable */
						, fontFamily: 'Arial',
						fontSize: 12,
						fill: fillText
					},
					textShort
				),
				line1Edge,
				lineLongEdge,
				lineShortEdge,
				_react2.default.createElement(_HoverTextNearMouse2.default, _extends({
					show: hoverTextEnabled && hover && !selected
				}, restHoverTextProps))
			);
		}
	}]);

	return EachTargetStop;
}(_react.Component);

EachTargetStop.propTypes = {
	startXY: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
	endXY: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
	dy: _propTypes2.default.number,

	interactive: _propTypes2.default.bool.isRequired,
	selected: _propTypes2.default.bool.isRequired,
	hoverText: _propTypes2.default.object.isRequired,

	appearance: _propTypes2.default.shape({
		stroke: _propTypes2.default.string.isRequired,
		fillOpacity: _propTypes2.default.number.isRequired,
		strokeOpacity: _propTypes2.default.number.isRequired,
		strokeWidth: _propTypes2.default.number.isRequired,
		fill: _propTypes2.default.string.isRequired,
		edgeStroke: _propTypes2.default.string.isRequired,
		edgeFill: _propTypes2.default.string.isRequired,
		edgeFill2: _propTypes2.default.string.isRequired,
		edgeStrokeWidth: _propTypes2.default.number.isRequired,
		r: _propTypes2.default.number.isRequired
	}).isRequired,

	index: _propTypes2.default.number,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired
};

EachTargetStop.defaultProps = {
	yDisplayFormat: function yDisplayFormat(d) {
		return d.toFixed(2);
	},
	interactive: true,
	selected: false,

	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	hoverText: {
		enable: false
	}
};

exports.default = EachTargetStop;
