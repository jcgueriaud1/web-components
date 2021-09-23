/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { CustomFieldElement } from '@vaadin/vaadin-custom-field/src/vaadin-custom-field.js';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { DatePicker } from '@vaadin/vaadin-date-picker/src/vaadin-date-picker.js';
import { TimePicker } from '@vaadin/vaadin-time-picker/src/vaadin-time-picker.js';

registerStyles(
  'vaadin-date-time-picker-custom-field',
  css`
    :host,
    .container {
      width: 100%;
    }
  `,
  { moduleId: 'vaadin-date-time-picker-custom-field' }
);

/**
 * An element used internally by `<vaadin-date-time-picker>`. Not intended to be used separately.
 *
 * @extends CustomFieldElement
 * @private
 */
class DateTimePickerCustomFieldElement extends CustomFieldElement {
  static get is() {
    return 'vaadin-date-time-picker-custom-field';
  }

  connectedCallback() {
    this.__toggleHasValue = function (value) {
      if (value !== null && value !== '' && value.split('T').indexOf('') === -1) {
        this.setAttribute('has-value', '');
      } else {
        this.removeAttribute('has-value');
      }
    };

    super.connectedCallback();
  }

  validate() {
    return;
  }

  /** @private */
  // TODO: Remove once custom field works with fields with a slotted input
  __getInputsFromSlot() {
    return super.__getInputsFromSlot().filter((input) => {
      return input instanceof DatePicker || input instanceof TimePicker;
    });
  }
}

customElements.define(DateTimePickerCustomFieldElement.is, DateTimePickerCustomFieldElement);
