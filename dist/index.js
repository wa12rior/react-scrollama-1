'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var isOffsetInPixels = function isOffsetInPixels(offset) {
  return typeof offset === 'string' && offset.includes('px');
};

var markerStyles = {
  position: 'fixed',
  left: 0,
  width: '100%',
  height: 0,
  borderTop: '2px dashed black',
  zIndex: 9999
};
var offsetTextStyles = {
  fontSize: '12px',
  fontFamily: 'monospace',
  margin: 0,
  padding: 6
};

var useTop = function useTop(offset) {
  var offsetInPixels = isOffsetInPixels(offset);

  if (offsetInPixels) {
    return offset;
  } else {
    return "".concat(offset * 100, "%");
  }
};

var DebugOffset = function DebugOffset(_ref) {
  var offset = _ref.offset;
  var top = useTop(offset);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: _objectSpread2(_objectSpread2({}, markerStyles), {}, {
      top: top
    })
  }, /*#__PURE__*/React__default['default'].createElement("p", {
    style: offsetTextStyles
  }, "trigger: ", offset));
};

var createThreshold = function createThreshold(theta, height) {
  var count = Math.ceil(height / theta);
  var t = [];
  var ratio = 1 / count;

  for (var i = 0; i <= count; i += 1) {
    t.push(i * ratio);
  }

  return t;
};

var TinyScrollama = function TinyScrollama(props) {
  var debug = props.debug,
      children = props.children,
      offset = props.offset,
      onStepEnter = props.onStepEnter,
      onStepExit = props.onStepExit,
      onStepProgress = props.onStepProgress,
      threshold = props.threshold;
  var isOffsetDefinedInPixels = isOffsetInPixels(offset);

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      lastScrollTop = _useState2[0],
      setLastScrollTop = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      windowInnerHeight = _useState4[0],
      setWindowInnerHeight = _useState4[1];

  var handleSetLastScrollTop = function handleSetLastScrollTop(scrollTop) {
    setLastScrollTop(scrollTop);
  };

  var handleWindowResize = function handleWindowResize(e) {
    setWindowInnerHeight(window.innerHeight);
  };

  React__default['default'].useEffect(function () {
    if (isOffsetDefinedInPixels) {
      window.addEventListener('resize', handleWindowResize);
      return function () {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, []);
  var innerHeight = windowInnerHeight || window.innerHeight;
  var offsetValue = isOffsetDefinedInPixels ? +offset.replace('px', '') / innerHeight : offset;
  var progressThreshold = React.useMemo(function () {
    return createThreshold(threshold, innerHeight);
  }, [innerHeight]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, debug && /*#__PURE__*/React__default['default'].createElement(DebugOffset, {
    offset: offset
  }), React__default['default'].Children.map(children, function (child, i) {
    return /*#__PURE__*/React__default['default'].cloneElement(child, {
      scrollamaId: "react-scrollama-".concat(i),
      offset: offsetValue,
      onStepEnter: onStepEnter,
      onStepExit: onStepExit,
      onStepProgress: onStepProgress,
      lastScrollTop: lastScrollTop,
      handleSetLastScrollTop: handleSetLastScrollTop,
      progressThreshold: progressThreshold,
      innerHeight: innerHeight
    });
  }));
};

TinyScrollama.defaultProps = {
  onStepProgress: null,
  onStepEnter: function onStepEnter() {},
  onStepExit: function onStepExit() {},
  threshold: 4
};

var ObserverMap = new Map();
var RootIds = new Map();
var rootId = 0;
/**
 * Generate a unique ID for the root element
 * @param root
 */

function getRootId(root) {
  if (!root) return '0';
  if (RootIds.has(root)) return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}
/**
 * Convert the options to a string Id, based on the values.
 * Ensures we can reuse the same observer when observing elements with the same options.
 * @param options
 */


function optionsToId(options) {
  return Object.keys(options).sort().filter(function (key) {
    return options[key] !== undefined;
  }).map(function (key) {
    return key + "_" + (key === 'root' ? getRootId(options.root) : options[key]);
  }).toString();
}

function createObserver(options) {
  // Create a unique ID for this observer instance, based on the root, root margin and threshold.
  var id = optionsToId(options);
  var instance = ObserverMap.get(id);

  if (!instance) {
    // Create a map of elements this observer is going to observe. Each element has a list of callbacks that should be triggered, once it comes into view.
    var elements = new Map();
    var thresholds;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var _elements$get;

        // While it would be nice if you could just look at isIntersecting to determine if the component is inside the viewport, browsers can't agree on how to use it.
        // -Firefox ignores `threshold` when considering `isIntersecting`, so it will never be false again if `threshold` is > 0
        var inView = entry.isIntersecting && thresholds.some(function (threshold) {
          return entry.intersectionRatio >= threshold;
        }); // @ts-ignore support IntersectionObserver v2

        if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
          // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
          // @ts-ignore
          entry.isVisible = inView;
        }

        (_elements$get = elements.get(entry.target)) == null ? void 0 : _elements$get.forEach(function (callback) {
          callback(inView, entry);
        });
      });
    }, options); // Ensure we have a valid thresholds array. If not, use the threshold from the options

    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
    instance = {
      id: id,
      observer: observer,
      elements: elements
    };
    ObserverMap.set(id, instance);
  }

  return instance;
}

function observe(element, callback, options) {
  if (options === void 0) {
    options = {};
  }

  if (!element) return function () {}; // An observer with the same options can be reused, so lets use this fact

  var _createObserver = createObserver(options),
      id = _createObserver.id,
      observer = _createObserver.observer,
      elements = _createObserver.elements; // Register the callback listener for this element


  var callbacks = elements.get(element) || [];

  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }

  callbacks.push(callback);
  observer.observe(element);
  return function unobserve() {
    // Remove the callback from the callback list
    callbacks.splice(callbacks.indexOf(callback), 1);

    if (callbacks.length === 0) {
      // No more callback exists for element, so destroy it
      elements["delete"](element);
      observer.unobserve(element);
    }

    if (elements.size === 0) {
      // No more elements are being observer by this instance, so destroy it
      observer.disconnect();
      ObserverMap["delete"](id);
    }
  };
}

function useInView(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      threshold = _ref.threshold,
      delay = _ref.delay,
      trackVisibility = _ref.trackVisibility,
      rootMargin = _ref.rootMargin,
      root = _ref.root,
      triggerOnce = _ref.triggerOnce,
      skip = _ref.skip,
      initialInView = _ref.initialInView;

  var unobserve = React.useRef();

  var _React$useState = React.useState({
    inView: !!initialInView
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var setRef = React.useCallback(function (node) {
    if (unobserve.current !== undefined) {
      unobserve.current();
      unobserve.current = undefined;
    } // Skip creating the observer


    if (skip) return;

    if (node) {
      unobserve.current = observe(node, function (inView, entry) {
        setState({
          inView: inView,
          entry: entry
        });

        if (entry.isIntersecting && triggerOnce && unobserve.current) {
          // If it should only trigger once, unobserve the element after it's inView
          unobserve.current();
          unobserve.current = undefined;
        }
      }, {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold,
        // @ts-ignore
        trackVisibility: trackVisibility,
        // @ts-ignore
        delay: delay
      });
    }
  }, // We break the rule here, because we aren't including the actual `threshold` variable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [// If the threshold is an array, convert it to a string so it won't change between renders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  Array.isArray(threshold) ? threshold.toString() : threshold, root, rootMargin, triggerOnce, skip, trackVisibility, delay]);
  /* eslint-disable-next-line */

  React.useEffect(function () {
    if (!unobserve.current && state.entry && !triggerOnce && !skip) {
      // If we don't have a ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)
      // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
      setState({
        inView: !!initialInView
      });
    }
  });
  var result = [setRef, state.inView, state.entry]; // Support object destructuring, by adding the specific values.

  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];
  return result;
}

var useRootMargin = function useRootMargin(offset) {
  return "-".concat(offset * 100, "% 0px -").concat(100 - offset * 100, "% 0px");
};

var useProgressRootMargin = function useProgressRootMargin(direction, offset, node, innerHeight) {
  if (!node.current) return '0px';
  var offsetHeight = node.current.offsetHeight / innerHeight;
  if (direction === 'down') return "".concat((offsetHeight - offset) * 100, "% 0px ").concat(offset * 100 - 100, "% 0px");
  return "-".concat(offset * 100, "% 0px ").concat(offsetHeight * 100 - (100 - offset * 100), "% 0px");
};

var Step = function Step(props) {
  var children = props.children,
      data = props.data,
      handleSetLastScrollTop = props.handleSetLastScrollTop,
      lastScrollTop = props.lastScrollTop,
      onStepEnter = props.onStepEnter,
      onStepExit = props.onStepExit,
      onStepProgress = props.onStepProgress,
      offset = props.offset,
      scrollamaId = props.scrollamaId,
      progressThreshold = props.progressThreshold,
      innerHeight = props.innerHeight;
  var scrollTop = document.documentElement.scrollTop;
  var direction = lastScrollTop < scrollTop ? 'down' : 'up';
  var rootMargin = useRootMargin(offset);
  var ref = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isIntersecting = _useState2[0],
      setIsIntersecting = _useState2[1];

  var _useInView = useInView({
    rootMargin: rootMargin,
    threshold: 0
  }),
      inViewRef = _useInView.ref,
      entry = _useInView.entry;

  var progressRootMargin = React.useMemo(function () {
    return useProgressRootMargin(direction, offset, ref, innerHeight);
  }, [direction, offset, ref, innerHeight]);

  var _useInView2 = useInView({
    rootMargin: progressRootMargin,
    threshold: progressThreshold
  }),
      scrollProgressRef = _useInView2.ref,
      scrollProgressEntry = _useInView2.entry;

  var setRefs = React.useCallback(function (node) {
    ref.current = node;
    inViewRef(node);
    scrollProgressRef(node);
  }, [inViewRef, scrollProgressRef]);
  React__default['default'].useEffect(function () {
    if (isIntersecting) {
      var _scrollProgressEntry$ = scrollProgressEntry.target.getBoundingClientRect(),
          height = _scrollProgressEntry$.height,
          top = _scrollProgressEntry$.top;

      var progress = Math.min(1, Math.max(0, (window.innerHeight * offset - top) / height));
      onStepProgress && onStepProgress({
        progress: progress,
        scrollamaId: scrollamaId,
        data: data,
        element: scrollProgressEntry.target,
        entry: scrollProgressEntry,
        direction: direction
      });
    }
  }, [scrollProgressEntry]);
  React__default['default'].useEffect(function () {
    if (entry && !entry.isIntersecting && isIntersecting) {
      onStepExit({
        element: entry.target,
        scrollamaId: scrollamaId,
        data: data,
        entry: entry,
        direction: direction
      });
      setIsIntersecting(false);
      handleSetLastScrollTop(scrollTop);
    } else if (entry && entry.isIntersecting && !isIntersecting) {
      setIsIntersecting(true);
      onStepEnter({
        element: entry.target,
        scrollamaId: scrollamaId,
        data: data,
        entry: entry,
        direction: direction
      });
      handleSetLastScrollTop(scrollTop);
    }
  }, [entry]);
  return /*#__PURE__*/React__default['default'].cloneElement(React__default['default'].Children.only(children), {
    'data-react-scrollama-id': scrollamaId,
    ref: setRefs,
    entry: entry
  });
};

Step.defaultProps = {
  onStepProgress: null,
  onStepEnter: function onStepEnter() {},
  onStepExit: function onStepExit() {}
};

exports.Scrollama = TinyScrollama;
exports.Step = Step;
//# sourceMappingURL=index.js.map
