import Blockly from "./_transfer_.js";
import goog from "./goog-lib.js";

/**
 * namespace declare 
 */
Blockly.Msg = {};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Empty name space for the Message singleton.
 * @author scr@google.com (Sheridan Rawlins)
 */
'use strict';


/**
 * Back up original getMsg function.
 * @type {!Function}
 */
goog.getMsgOrig = goog.getMsg;

/**
 * Gets a localized message.
 * Overrides the default Closure function to check for a Blockly.Msg first.
 * Used infrequently, only known case is TODAY button in date picker.
 * @param {string} str Translatable string, places holders in the form {$foo}.
 * @param {Object<string, string>=} opt_values Maps place holder name to value.
 * @return {string} message with placeholders filled.
 * @suppress {duplicate}
 */
goog.getMsg = function(str, opt_values) {
  var key = goog.getMsg.blocklyMsgMap[str];
  if (key) {
    str = Blockly.Msg[key];
  }
  return goog.getMsgOrig(str, opt_values);
};

/**
 * Mapping of Closure messages to Blockly.Msg names.
 */
goog.getMsg.blocklyMsgMap = {
  'Today': 'TODAY'
};
export default Blockly;
