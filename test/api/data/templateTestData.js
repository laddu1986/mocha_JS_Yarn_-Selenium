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

export const textVal = {
  defaultValue: 'default_value_text',
  rules: [
    {
      characterCount: {
        min: 1,
        max: 10,
        mode: 10
      },
      regex: {
        pattern: 'pattern_text'
      },
      required: {
        isRequired: true
      },
      errorMessage: 'error_message_text'
    }
  ]
};

export const intVal = {
  default_value: 10,
  rules: [
    {
      number_range: {
        min: 0,
        max: 10,
        mode: 10
      },
      number_range_slider: {
        min: 0,
        max: 10,
        mode: 10,
        increment: 5
      },
      required: {
        is_required: true
      },
      error_message: 'error_message_text'
    }
  ]
};

export const boolVal = {
  default_value: true,
  rules: [
    {
      required: {
        is_required: true
      },
      error_message: 'error_message_text'
    }
  ]
};
