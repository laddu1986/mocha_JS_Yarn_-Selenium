export const emptyString = '';

export const longKey = 'a23456789_223456789_323456789_423456789_523456789_623456789_aaaa';

export const longName =
  'qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_1';

export const capsKey = 'Abcde';

export const keyWithSpace = ' Abcde';

export const validString = 'abcdef';

export const numberString = '4bstra';

export const underscoreString = '_bstra';

// prettier-ignore
export const invalidChars = [
  "!", "@", "#", "$", "%", "^",
  "&", "*", "(", ")", "+", "=",
  "|", "\\", "`", "~", "{", "}",
  ":", ";", "'", '"', "<", ",",
  ">", ".", "?", "/", "-"
];
// prettier-ignore
export const reservedWords = [
  "abstract", "await", "boolean", "break",
  "byte", "case", "catch", "char",
  "class", "const", "continue", "debugger",
  "default", "delete", "do", "double",
  "else", "enum", "export", "extends",
  "false", "final", "finally", "float",
  "for", "function", "goto", "if",
  "implements", "import", "in", "instanceof",
  "int", "interface", "let", "long",
  "native", "new", "null", "package",
  "private", "protected", "public", "return",
  "short", "static", "super", "switch",
  "synchronized", "this", "throw", "throws",
  "transient", "true", "try", "typeof",
  "var", "void", "volatile", "while",
  "with", "yield"
];
export const properties = new Object();
properties.text = {
  defaultValue: 'default_value_text',
  localizable: true,
  rules: [
    {
      constraint: 'RangeInt',
      characterCount: {
        min: 1,
        max: 10,
        mode: 10
      },
      errorMessage: 'text_range_error_message'
    },
    {
      constraint: 'Regex',
      regex: {
        pattern: 'pattern_text'
      },
      errorMessage: 'text_regex_error_message'
    },
    {
      constraint: 'Required',
      required: {
        isRequired: true
      },
      errorMessage: 'text_required_error_message'
    }
  ]
};

properties.integer = {
  defaultValue: 10,
  localizable: true,
  rules: [
    {
      constraint: 'RangeInt',
      numberRange: {
        min: 1,
        max: 10,
        mode: 10
      },
      errorMessage: 'int_rangeint_error_message_text'
    },
    {
      constraint: 'RangeIntSlider',
      numberRangeSlider: {
        min: 1,
        max: 10,
        mode: 10,
        increment: 5
      },
      errorMessage: 'int_rangeIntSlider_error_message_text'
    },
    {
      constraint: 'Required',
      required: {
        isRequired: true
      },
      errorMessage: 'int_required_error_message_text'
    }
  ]
};

properties.boolean = {
  defaultValue: true,
  rules: [
    {
      constraint: 'Required',
      required: {
        isRequired: true
      },
      errorMessage: 'bool_required_error_message'
    }
  ]
};
properties.date = {
  defaultValue: {
    seconds: Date.now(),
    nanos: 0
  },
  localizable: true,
  rules: [
    {
      constraint: 'RangeDate',
      dateRange: {
        min: {
          seconds: Date.now() - 100,
          nanos: 0
        },
        max: {
          seconds: Date.now() + 100,
          nanos: 0
        },
        mode: 10
      },
      errorMessage: 'date_range_error_message_text'
    },
    {
      constraint: 'Required',
      required: {
        isRequired: true
      },
      errorMessage: 'date_req_error_message'
    }
  ]
};

properties.color = {
  defaultValue: {
    key: 'key_of_color',
    value: 'value_of_color',
    opacity: 100
  },
  rules: [
    {
      constraint: 'Required',
      required: {
        isRequired: true
      },
      errorMessage: 'color_error_message'
    }
  ]
};

properties.list = {
  defaultValue: {
    value: ['1st_val']
  },
  localizable: true,
  rules: [
    {
      constraint: 'RangeInt',
      valueCount: {
        min: 10,
        max: 10,
        mode: 10
      },
      errorMessage: 'list_range_err_msg'
    },
    {
      constraint: 'Regex',
      regex: {
        pattern: 'regex_pattern'
      },
      errorMessage: 'list_regex_error_msg'
    },
    {
      constraint: 'Required',
      required: {
        isRequired: true
      },
      errorMessage: 'list_req_err_msg'
    }
  ]
};
