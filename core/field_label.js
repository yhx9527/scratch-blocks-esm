import Blockly from "./_transfer_.js";
import goog from "./goog-lib.js";
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Non-editable text field.  Used for titles, labels, etc.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

import "./field.js";
import "./tooltip.js";


/**
 * Class for a non-editable field.
 * @param {string} text The initial content of the field.
 * @param {string=} opt_class Optional CSS class for the field's text.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldLabel = function(text, opt_class) {
  this.size_ = new goog.math.Size(0, 0);
  this.class_ = opt_class;
  this.setValue(text);
};
goog.inherits(Blockly.FieldLabel, Blockly.Field);

/**
 * Construct a FieldLabel from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (text, and class).
 * @returns {!Blockly.FieldLabel} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldLabel.fromJson = function(options) {
  var text = Blockly.utils.replaceMessageReferences(options['text']);
  return new Blockly.FieldLabel(text, options['class']);
};

/**
 * Editable fields usually show some sort of UI for the user to change them.
 * @type {boolean}
 * @public
 */
Blockly.FieldLabel.prototype.EDITABLE = false;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not.  Editable fields should be serialized.
 * @type {boolean}
 * @public
 */
Blockly.FieldLabel.prototype.SERIALIZABLE = false;

/**
 * Install this text on a block.
 */
Blockly.FieldLabel.prototype.init = function() {
  if (this.textElement_) {
    // Text has already been initialized once.
    return;
  }
  // Build the DOM.
  this.textElement_ = Blockly.utils.createSvgElement('text',
      {
        'class': 'blocklyText',
        'y': Blockly.BlockSvg.FIELD_TOP_PADDING,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'dy': goog.userAgent.EDGE_OR_IE ? Blockly.Field.IE_TEXT_OFFSET : '0'
      }, null);
  if (this.class_) {
    Blockly.utils.addClass(this.textElement_, this.class_);
  }
  if (!this.visible_) {
    this.textElement_.style.display = 'none';
  }
  this.sourceBlock_.getSvgRoot().appendChild(this.textElement_);

  // Configure the field to be transparent with respect to tooltips.
  this.textElement_.tooltip = this.sourceBlock_;
  Blockly.Tooltip.bindMouseEvents(this.textElement_);
  // Force a render.
  this.render_();
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldLabel.prototype.dispose = function() {
  goog.dom.removeNode(this.textElement_);
  this.textElement_ = null;
};

/**
 * Gets the group element for this field.
 * Used for measuring the size and for positioning.
 * @return {!Element} The group element.
 */
Blockly.FieldLabel.prototype.getSvgRoot = function() {
  return /** @type {!Element} */ (this.textElement_);
};

/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Blockly.FieldLabel.prototype.setTooltip = function(newTip) {
  this.textElement_.tooltip = newTip;
};

Blockly.Field.register('field_label', Blockly.FieldLabel);
export default Blockly;
