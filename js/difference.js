(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define(factory);
  else if (typeof exports === "object") exports["JsDiff"] = factory();
  else root["JsDiff"] = factory();
})(this, function () {
  return (function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = (installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false,
      });
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      module.loaded = true;
      return module.exports;
    }

    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
  })(
    [
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _diffBase = __webpack_require__(1);

        var _diffBase2 = _interopRequireDefault(_diffBase);

        var _diffCharacter = __webpack_require__(3);

        var _diffWord = __webpack_require__(4);

        var _diffLine = __webpack_require__(5);

        var _diffSentence = __webpack_require__(6);

        var _diffCss = __webpack_require__(7);

        var _diffJson = __webpack_require__(8);

        var _patchApply = __webpack_require__(9);

        var _patchCreate = __webpack_require__(10);

        var _convertDmp = __webpack_require__(12);

        var _convertXml = __webpack_require__(13);

        exports.Diff = _diffBase2["default"];
        exports.diffChars = _diffCharacter.diffChars;
        exports.diffWords = _diffWord.diffWords;
        exports.diffWordsWithSpace = _diffWord.diffWordsWithSpace;
        exports.diffLines = _diffLine.diffLines;
        exports.diffTrimmedLines = _diffLine.diffTrimmedLines;
        exports.diffSentences = _diffSentence.diffSentences;
        exports.diffCss = _diffCss.diffCss;
        exports.diffJson = _diffJson.diffJson;
        exports.structuredPatch = _patchCreate.structuredPatch;
        exports.createTwoFilesPatch = _patchCreate.createTwoFilesPatch;
        exports.createPatch = _patchCreate.createPatch;
        exports.applyPatch = _patchApply.applyPatch;
        exports.convertChangesToDMP = _convertDmp.convertChangesToDMP;
        exports.convertChangesToXML = _convertXml.convertChangesToXML;
        exports.canonicalize = _diffJson.canonicalize;

        
      },
      /* 1 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports["default"] = Diff;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _utilMap = __webpack_require__(2);

        var _utilMap2 = _interopRequireDefault(_utilMap);

        function Diff(ignoreWhitespace) {
          this.ignoreWhitespace = ignoreWhitespace;
        }

        Diff.prototype = {
          diff: function diff(oldString, newString, callback) {
            var self = this;

            function done(value) {
              if (callback) {
                setTimeout(function () {
                  callback(undefined, value);
                }, 0);
                return true;
              } else {
                return value;
              }
            }

            oldString = this.castInput(oldString);
            newString = this.castInput(newString);

            if (newString === oldString) {
              return done([{ value: newString }]);
            }
            if (!newString) {
              return done([{ value: oldString, removed: true }]);
            }
            if (!oldString) {
              return done([{ value: newString, added: true }]);
            }

            newString = this.removeEmpty(this.tokenize(newString));
            oldString = this.removeEmpty(this.tokenize(oldString));

            var newLen = newString.length,
              oldLen = oldString.length;
            var editLength = 1;
            var maxEditLength = newLen + oldLen;
            var bestPath = [{ newPos: -1, components: [] }];

            var oldPos = this.extractCommon(
              bestPath[0],
              newString,
              oldString,
              0
            );
            if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
              return done([{ value: newString.join("") }]);
            }

            function execEditLength() {
              for (
                var diagonalPath = -1 * editLength;
                diagonalPath <= editLength;
                diagonalPath += 2
              ) {
                var basePath = undefined;
                var addPath = bestPath[diagonalPath - 1],
                  removePath = bestPath[diagonalPath + 1],
                  _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                if (addPath) {
                  bestPath[diagonalPath - 1] = undefined;
                }

                var canAdd = addPath && addPath.newPos + 1 < newLen,
                  canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
                if (!canAdd && !canRemove) {
                  bestPath[diagonalPath] = undefined;
                  continue;
                }

                if (
                  !canAdd ||
                  (canRemove && addPath.newPos < removePath.newPos)
                ) {
                  basePath = clonePath(removePath);
                  self.pushComponent(basePath.components, undefined, true);
                } else {
                  basePath = addPath;
                  basePath.newPos++;
                  self.pushComponent(basePath.components, true, undefined);
                }

                _oldPos = self.extractCommon(
                  basePath,
                  newString,
                  oldString,
                  diagonalPath
                );

                if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
                  return done(
                    buildValues(
                      basePath.components,
                      newString,
                      oldString,
                      self.useLongestToken
                    )
                  );
                } else {
                  bestPath[diagonalPath] = basePath;
                }
              }

              editLength++;
            }

            if (callback) {
              (function exec() {
                setTimeout(function () {
                  /* istanbul ignore next */
                  if (editLength > maxEditLength) {
                    return callback();
                  }

                  if (!execEditLength()) {
                    exec();
                  }
                }, 0);
              })();
            } else {
              while (editLength <= maxEditLength) {
                var ret = execEditLength();
                if (ret) {
                  return ret;
                }
              }
            }
          },

          pushComponent: function pushComponent(components, added, removed) {
            var last = components[components.length - 1];
            if (last && last.added === added && last.removed === removed) {
              components[components.length - 1] = {
                count: last.count + 1,
                added: added,
                removed: removed,
              };
            } else {
              components.push({ count: 1, added: added, removed: removed });
            }
          },
          extractCommon: function extractCommon(
            basePath,
            newString,
            oldString,
            diagonalPath
          ) {
            var newLen = newString.length,
              oldLen = oldString.length,
              newPos = basePath.newPos,
              oldPos = newPos - diagonalPath,
              commonCount = 0;
            while (
              newPos + 1 < newLen &&
              oldPos + 1 < oldLen &&
              this.equals(newString[newPos + 1], oldString[oldPos + 1])
            ) {
              newPos++;
              oldPos++;
              commonCount++;
            }

            if (commonCount) {
              basePath.components.push({ count: commonCount });
            }

            basePath.newPos = newPos;
            return oldPos;
          },

          equals: function equals(left, right) {
            var reWhitespace = /\S/;
            return (
              left === right ||
              (this.ignoreWhitespace &&
                !reWhitespace.test(left) &&
                !reWhitespace.test(right))
            );
          },
          removeEmpty: function removeEmpty(array) {
            var ret = [];
            for (var i = 0; i < array.length; i++) {
              if (array[i]) {
                ret.push(array[i]);
              }
            }
            return ret;
          },
          castInput: function castInput(value) {
            return value;
          },
          tokenize: function tokenize(value) {
            return value.split("");
          },
        };

        function buildValues(
          components,
          newString,
          oldString,
          useLongestToken
        ) {
          var componentPos = 0,
            componentLen = components.length,
            newPos = 0,
            oldPos = 0;

          for (; componentPos < componentLen; componentPos++) {
            var component = components[componentPos];
            if (!component.removed) {
              if (!component.added && useLongestToken) {
                var value = newString.slice(newPos, newPos + component.count);
                value = _utilMap2["default"](value, function (value, i) {
                  var oldValue = oldString[oldPos + i];
                  return oldValue.length > value.length ? oldValue : value;
                });

                component.value = value.join("");
              } else {
                component.value = newString
                  .slice(newPos, newPos + component.count)
                  .join("");
              }
              newPos += component.count;

              if (!component.added) {
                oldPos += component.count;
              }
            } else {
              component.value = oldString
                .slice(oldPos, oldPos + component.count)
                .join("");
              oldPos += component.count;

              if (componentPos && components[componentPos - 1].added) {
                var tmp = components[componentPos - 1];
                components[componentPos - 1] = components[componentPos];
                components[componentPos] = tmp;
              }
            }
          }

          return components;
        }

        function clonePath(path) {
          return { newPos: path.newPos, components: path.components.slice(0) };
        }
        module.exports = exports["default"];

        
      },
      /* 2 */
       function (module, exports) {
        "use strict";

        exports.__esModule = true;
        exports["default"] = map;

        /* istanbul ignore next */
        function map(arr, mapper, that) {
          if (Array.prototype.map) {
            return Array.prototype.map.call(arr, mapper, that);
          }

          var other = new Array(arr.length);

          for (var i = 0, n = arr.length; i < n; i++) {
            other[i] = mapper.call(that, arr[i], i, arr);
          }
          return other;
        }
        module.exports = exports["default"];

        
      },
      /* 3 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.diffChars = diffChars;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var characterDiff = new _base2["default"]();
        exports.characterDiff = characterDiff;

        function diffChars(oldStr, newStr, callback) {
          return characterDiff.diff(oldStr, newStr, callback);
        }

        
      },
      /* 4 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.diffWords = diffWords;
        exports.diffWordsWithSpace = diffWordsWithSpace;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var extendedWordChars =
          /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;

        var wordDiff = new _base2["default"](true);
        exports.wordDiff = wordDiff;
        var wordWithSpaceDiff = new _base2["default"]();
        exports.wordWithSpaceDiff = wordWithSpaceDiff;
        wordDiff.tokenize = wordWithSpaceDiff.tokenize = function (value) {
          var tokens = value.split(/(\s+|\b)/);

          for (var i = 0; i < tokens.length - 1; i++) {
            if (
              !tokens[i + 1] &&
              tokens[i + 2] &&
              extendedWordChars.test(tokens[i]) &&
              extendedWordChars.test(tokens[i + 2])
            ) {
              tokens[i] += tokens[i + 2];
              tokens.splice(i + 1, 2);
              i--;
            }
          }

          return tokens;
        };

        function diffWords(oldStr, newStr, callback) {
          return wordDiff.diff(oldStr, newStr, callback);
        }

        function diffWordsWithSpace(oldStr, newStr, callback) {
          return wordWithSpaceDiff.diff(oldStr, newStr, callback);
        }

        
      },
      /* 5 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.diffLines = diffLines;
        exports.diffTrimmedLines = diffTrimmedLines;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var lineDiff = new _base2["default"]();
        exports.lineDiff = lineDiff;
        var trimmedLineDiff = new _base2["default"]();
        exports.trimmedLineDiff = trimmedLineDiff;
        trimmedLineDiff.ignoreTrim = true;

        lineDiff.tokenize = trimmedLineDiff.tokenize = function (value) {
          var retLines = [],
            lines = value.split(/^/m);
          for (var i = 0; i < lines.length; i++) {
            var line = lines[i],
              lastLine = lines[i - 1],
              lastLineLastChar = lastLine && lastLine[lastLine.length - 1];

            if (line === "\n" && lastLineLastChar === "\r") {
              retLines[retLines.length - 1] =
                retLines[retLines.length - 1].slice(0, -1) + "\r\n";
            } else {
              if (this.ignoreTrim) {
                line = line.trim();
                if (i < lines.length - 1) {
                  line += "\n";
                }
              }
              retLines.push(line);
            }
          }

          return retLines;
        };

        function diffLines(oldStr, newStr, callback) {
          return lineDiff.diff(oldStr, newStr, callback);
        }

        function diffTrimmedLines(oldStr, newStr, callback) {
          return trimmedLineDiff.diff(oldStr, newStr, callback);
        }

        
      },
      /* 6 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.diffSentences = diffSentences;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var sentenceDiff = new _base2["default"]();
        exports.sentenceDiff = sentenceDiff;
        sentenceDiff.tokenize = function (value) {
          return value.split(/(\S.+?[.!?])(?=\s+|$)/);
        };

        function diffSentences(oldStr, newStr, callback) {
          return sentenceDiff.diff(oldStr, newStr, callback);
        }

        
      },
      /* 7 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.diffCss = diffCss;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var cssDiff = new _base2["default"]();
        exports.cssDiff = cssDiff;
        cssDiff.tokenize = function (value) {
          return value.split(/([{}:;,]|\s+)/);
        };

        function diffCss(oldStr, newStr, callback) {
          return cssDiff.diff(oldStr, newStr, callback);
        }

        
      },
      /* 8 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.diffJson = diffJson;
        exports.canonicalize = canonicalize;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var _line = __webpack_require__(5);

        var objectPrototypeToString = Object.prototype.toString;

        var jsonDiff = new _base2["default"]();
        exports.jsonDiff = jsonDiff;
        jsonDiff.useLongestToken = true;

        jsonDiff.tokenize = _line.lineDiff.tokenize;
        jsonDiff.castInput = function (value) {
          return typeof value === "string"
            ? value
            : JSON.stringify(canonicalize(value), undefined, "  ");
        };
        jsonDiff.equals = function (left, right) {
          return _base2["default"].prototype.equals(
            left.replace(/,([\r\n])/g, "$1"),
            right.replace(/,([\r\n])/g, "$1")
          );
        };

        function diffJson(oldObj, newObj, callback) {
          return jsonDiff.diff(oldObj, newObj, callback);
        }

        function canonicalize(obj, stack, replacementStack) {
          stack = stack || [];
          replacementStack = replacementStack || [];

          var i = undefined;

          for (i = 0; i < stack.length; i += 1) {
            if (stack[i] === obj) {
              return replacementStack[i];
            }
          }

          var canonicalizedObj = undefined;

          if ("[object Array]" === objectPrototypeToString.call(obj)) {
            stack.push(obj);
            canonicalizedObj = new Array(obj.length);
            replacementStack.push(canonicalizedObj);
            for (i = 0; i < obj.length; i += 1) {
              canonicalizedObj[i] = canonicalize(
                obj[i],
                stack,
                replacementStack
              );
            }
            stack.pop();
            replacementStack.pop();
          } else if (typeof obj === "object" && obj !== null) {
            stack.push(obj);
            canonicalizedObj = {};
            replacementStack.push(canonicalizedObj);
            var sortedKeys = [],
              key = undefined;
            for (key in obj) {
              /* istanbul ignore else */
              if (obj.hasOwnProperty(key)) {
                sortedKeys.push(key);
              }
            }
            sortedKeys.sort();
            for (i = 0; i < sortedKeys.length; i += 1) {
              key = sortedKeys[i];
              canonicalizedObj[key] = canonicalize(
                obj[key],
                stack,
                replacementStack
              );
            }
            stack.pop();
            replacementStack.pop();
          } else {
            canonicalizedObj = obj;
          }
          return canonicalizedObj;
        }

        
      },
      /* 9 */
       function (module, exports) {
        "use strict";

        exports.__esModule = true;
        exports.applyPatch = applyPatch;

        function applyPatch(oldStr, uniDiff) {
          var diffstr = uniDiff.split("\n"),
            hunks = [],
            i = 0,
            remEOFNL = false,
            addEOFNL = false;

          while (i < diffstr.length && !/^@@/.test(diffstr[i])) {
            i++;
          }

          for (; i < diffstr.length; i++) {
            if (diffstr[i][0] === "@") {
              var chnukHeader = diffstr[i].split(
                /@@ -(\d+),(\d+) \+(\d+),(\d+) @@/
              );
              hunks.unshift({
                start: chnukHeader[3],
                oldlength: +chnukHeader[2],
                removed: [],
                newlength: chnukHeader[4],
                added: [],
              });
            } else if (diffstr[i][0] === "+") {
              hunks[0].added.push(diffstr[i].substr(1));
            } else if (diffstr[i][0] === "-") {
              hunks[0].removed.push(diffstr[i].substr(1));
            } else if (diffstr[i][0] === " ") {
              hunks[0].added.push(diffstr[i].substr(1));
              hunks[0].removed.push(diffstr[i].substr(1));
            } else if (diffstr[i][0] === "\\") {
              if (diffstr[i - 1][0] === "+") {
                remEOFNL = true;
              } else if (diffstr[i - 1][0] === "-") {
                addEOFNL = true;
              }
            }
          }

          var lines = oldStr.split("\n");
          for (i = hunks.length - 1; i >= 0; i--) {
            var hunk = hunks[i];
            for (var j = 0; j < hunk.oldlength; j++) {
              if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {
                return false;
              }
            }
            Array.prototype.splice.apply(
              lines,
              [hunk.start - 1, hunk.oldlength].concat(hunk.added)
            );
          }

          if (remEOFNL) {
            while (!lines[lines.length - 1]) {
              lines.pop();
            }
          } else if (addEOFNL) {
            lines.push("");
          }
          return lines.join("\n");
        }

        
      },
      /* 10 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;
        exports.structuredPatch = structuredPatch;
        exports.createTwoFilesPatch = createTwoFilesPatch;
        exports.createPatch = createPatch;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _diffPatch = __webpack_require__(11);

        var _utilMap = __webpack_require__(2);

        var _utilMap2 = _interopRequireDefault(_utilMap);

        function structuredPatch(
          oldFileName,
          newFileName,
          oldStr,
          newStr,
          oldHeader,
          newHeader,
          options
        ) {
          if (!options) {
            options = { context: 4 };
          }

          var diff = _diffPatch.patchDiff.diff(oldStr, newStr);
          diff.push({ value: "", lines: [] });

          function contextLines(lines) {
            return _utilMap2["default"](lines, function (entry) {
              return " " + entry;
            });
          }

          var hunks = [];
          var oldRangeStart = 0,
            newRangeStart = 0,
            curRange = [],
            oldLine = 1,
            newLine = 1;

          var _loop = function (i) {
            var current = diff[i],
              lines =
                current.lines || current.value.replace(/\n$/, "").split("\n");
            current.lines = lines;

            if (current.added || current.removed) {
              if (!oldRangeStart) {
                var prev = diff[i - 1];
                oldRangeStart = oldLine;
                newRangeStart = newLine;

                if (prev) {
                  curRange =
                    options.context > 0
                      ? contextLines(prev.lines.slice(-options.context))
                      : [];
                  oldRangeStart -= curRange.length;
                  newRangeStart -= curRange.length;
                }
              }

              curRange.push.apply(
                curRange,
                _utilMap2["default"](lines, function (entry) {
                  return (current.added ? "+" : "-") + entry;
                })
              );

              if (current.added) {
                newLine += lines.length;
              } else {
                oldLine += lines.length;
              }
            } else {
              if (oldRangeStart) {
                if (
                  lines.length <= options.context * 2 &&
                  i < diff.length - 2
                ) {
                  curRange.push.apply(curRange, contextLines(lines));
                } else {
                  var contextSize = Math.min(lines.length, options.context);
                  curRange.push.apply(
                    curRange,
                    contextLines(lines.slice(0, contextSize))
                  );

                  var hunk = {
                    oldStart: oldRangeStart,
                    oldLines: oldLine - oldRangeStart + contextSize,
                    newStart: newRangeStart,
                    newLines: newLine - newRangeStart + contextSize,
                    lines: curRange,
                  };
                  if (i >= diff.length - 2 && lines.length <= options.context) {
                    var oldEOFNewline = /\n$/.test(oldStr);
                    var newEOFNewline = /\n$/.test(newStr);
                    if (lines.length == 0 && !oldEOFNewline) {
                      curRange.splice(
                        hunk.oldLines,
                        0,
                        "\\ No newline at end of file"
                      );
                    } else if (!oldEOFNewline || !newEOFNewline) {
                      curRange.push("\\ No newline at end of file");
                    }
                  }
                  hunks.push(hunk);

                  oldRangeStart = 0;
                  newRangeStart = 0;
                  curRange = [];
                }
              }
              oldLine += lines.length;
              newLine += lines.length;
            }
          };

          for (var i = 0; i < diff.length; i++) {
            _loop(i);
          }

          return {
            oldFileName: oldFileName,
            newFileName: newFileName,
            oldHeader: oldHeader,
            newHeader: newHeader,
            hunks: hunks,
          };
        }

        function createTwoFilesPatch(
          oldFileName,
          newFileName,
          oldStr,
          newStr,
          oldHeader,
          newHeader,
          options
        ) {
          var diff = structuredPatch(
            oldFileName,
            newFileName,
            oldStr,
            newStr,
            oldHeader,
            newHeader,
            options
          );

          var ret = [];
          if (oldFileName == newFileName) {
            ret.push("Index: " + oldFileName);
          }
          ret.push(
            "==================================================================="
          );
          ret.push(
            "--- " +
              diff.oldFileName +
              (typeof diff.oldHeader === "undefined"
                ? ""
                : "\t" + diff.oldHeader)
          );
          ret.push(
            "+++ " +
              diff.newFileName +
              (typeof diff.newHeader === "undefined"
                ? ""
                : "\t" + diff.newHeader)
          );

          for (var i = 0; i < diff.hunks.length; i++) {
            var hunk = diff.hunks[i];
            ret.push(
              "@@ -" +
                hunk.oldStart +
                "," +
                hunk.oldLines +
                " +" +
                hunk.newStart +
                "," +
                hunk.newLines +
                " @@"
            );
            ret.push.apply(ret, hunk.lines);
          }

          return ret.join("\n") + "\n";
        }

        function createPatch(
          fileName,
          oldStr,
          newStr,
          oldHeader,
          newHeader,
          options
        ) {
          return createTwoFilesPatch(
            fileName,
            fileName,
            oldStr,
            newStr,
            oldHeader,
            newHeader,
            options
          );
        }

        
      },
      /* 11 */
       function (module, exports, __webpack_require__) {
        "use strict";

        exports.__esModule = true;

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _base = __webpack_require__(1);

        var _base2 = _interopRequireDefault(_base);

        var patchDiff = new _base2["default"]();
        exports.patchDiff = patchDiff;
        patchDiff.tokenize = function (value) {
          var ret = [],
            linesAndNewlines = value.split(/(\n|\r\n)/);

          if (!linesAndNewlines[linesAndNewlines.length - 1]) {
            linesAndNewlines.pop();
          }

          for (var i = 0; i < linesAndNewlines.length; i++) {
            var line = linesAndNewlines[i];

            if (i % 2) {
              ret[ret.length - 1] += line;
            } else {
              ret.push(line);
            }
          }
          return ret;
        };

        
      },
      /* 12 */
       function (module, exports) {
        "use strict";

        exports.__esModule = true;
        exports.convertChangesToDMP = convertChangesToDMP;

        function convertChangesToDMP(changes) {
          var ret = [],
            change = undefined,
            operation = undefined;
          for (var i = 0; i < changes.length; i++) {
            change = changes[i];
            if (change.added) {
              operation = 1;
            } else if (change.removed) {
              operation = -1;
            } else {
              operation = 0;
            }

            ret.push([operation, change.value]);
          }
          return ret;
        }

        
      },
      /* 13 */
       function (module, exports) {
        "use strict";

        exports.__esModule = true;
        exports.convertChangesToXML = convertChangesToXML;

        function convertChangesToXML(changes) {
          var ret = [];
          for (var i = 0; i < changes.length; i++) {
            var change = changes[i];
            if (change.added) {
              ret.push("<ins>");
            } else if (change.removed) {
              ret.push("<del>");
            }

            ret.push(escapeHTML(change.value));

            if (change.added) {
              ret.push("</ins>");
            } else if (change.removed) {
              ret.push("</del>");
            }
          }
          return ret.join("");
        }

        function escapeHTML(s) {
          var n = s;
          n = n.replace(/&/g, "&amp;");
          n = n.replace(/</g, "&lt;");
          n = n.replace(/>/g, "&gt;");
          n = n.replace(/"/g, "&quot;");

          return n;
        }

        
      },
    ]
  );
});