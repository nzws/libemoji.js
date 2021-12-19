import { generate } from '../../lib';

jest.mock('bindings', () => () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  generate: jest.fn((...a) => [...a])
}));

const baseText = 'emo\nji';
const baseOptions = {
  width: 128,
  height: 128,
  color: '#000000FF',
  backgroundColor: '#00000000',
  textAlign: 'center',
  textSizeFixed: false,
  disableStretch: false,
  typefaceFile: '',
  typefaceName: '',
  format: 'png',
  quality: 100
} as const;

describe('validator', () => {
  test('textが存在しなければエラー', () => {
    const text = '';
    expect(() =>
      generate(text, baseOptions)
    ).toThrowErrorMatchingInlineSnapshot(`"text must be a string"`);

    expect(() =>
      generate(undefined, baseOptions)
    ).toThrowErrorMatchingInlineSnapshot(`"text must be a string"`);
  });

  test('widthが負の数か0であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        width: -1
      })
    ).toThrowErrorMatchingInlineSnapshot(`"width must be a positive number"`);

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        width: 0
      })
    ).toThrowErrorMatchingInlineSnapshot(`"width must be a positive number"`);
  });

  test('heightが負の数か0であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        height: -1
      })
    ).toThrowErrorMatchingInlineSnapshot(`"height must be a positive number"`);

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        height: 0
      })
    ).toThrowErrorMatchingInlineSnapshot(`"height must be a positive number"`);
  });

  test('colorが桁が足りないか空欄であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        color: '#000000'
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"color code must be 8 digits, including alpha (eg. #000000FF)"`
    );

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        color: ''
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"color code must be 8 digits, including alpha (eg. #000000FF)"`
    );
  });

  test('backgroundColorが桁が足りないか空欄であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        backgroundColor: '#000000'
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"color code must be 8 digits, including alpha (eg. #000000FF)"`
    );

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        backgroundColor: ''
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"color code must be 8 digits, including alpha (eg. #000000FF)"`
    );
  });

  test('textAlignが空か不正な値であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        // @ts-expect-error: test
        textAlign: ''
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"align must be one of the following: left, center, right"`
    );

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        // @ts-expect-error: test
        textAlign: 'leftt'
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"align must be one of the following: left, center, right"`
    );
  });

  test('textSizeFixedがbooleanでなければエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        textSizeFixed: null
      })
    ).toThrowErrorMatchingInlineSnapshot(`"textSizeFixed must be a boolean"`);
  });

  test('disableStretchがbooleanでなければエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        disableStretch: null
      })
    ).toThrowErrorMatchingInlineSnapshot(`"disableStretch must be a boolean"`);
  });

  test('typefaceFileがstringでなければエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        typefaceFile: null
      })
    ).toThrowErrorMatchingInlineSnapshot(`"typefaceFile must be a string"`);
  });

  test('typefaceNameがstringでなければエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        typefaceName: null
      })
    ).toThrowErrorMatchingInlineSnapshot(`"typefaceName must be a string"`);
  });

  test('formatが空か不正な値であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        // @ts-expect-error: test
        format: ''
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"format must be one of the following: png, webp"`
    );

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        // @ts-expect-error: test
        format: 'pngg'
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"format must be one of the following: png, webp"`
    );
  });

  test('qualityが0~100以外であればエラー', () => {
    expect(() =>
      generate(baseText, {
        ...baseOptions,
        quality: -1
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"quality must be a number between 0 and 100"`
    );

    expect(() =>
      generate(baseText, {
        ...baseOptions,
        quality: 101
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"quality must be a number between 0 and 100"`
    );
  });
});

describe('binding', () => {
  test('ネイティブ関数に正常な引数が渡される', () => {
    const result = generate(baseText, baseOptions);

    expect(result).toMatchInlineSnapshot(`
      Array [
        "emo
      ji",
        Object {
          "backgroundColor": 0,
          "color": -16777216,
          "disableStretch": false,
          "format": "png",
          "height": 128,
          "quality": 100,
          "textAlign": "center",
          "textSizeFixed": false,
          "typefaceFile": "",
          "typefaceName": "",
          "width": 128,
        },
      ]
    `);
  });
});
