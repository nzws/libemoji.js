import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { generate } from '../../lib';

expect.extend({ toMatchImageSnapshot });

describe('binary', () => {
  test('default', () => {
    const { buffer } = generate('emo\nji');

    expect(buffer).toMatchImageSnapshot();
  });

  test('size', () => {
    const { buffer } = generate('emo\nji', {
      width: 512,
      height: 512
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('color', () => {
    const { buffer } = generate('emo\nji', {
      color: '#1fddffff'
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('backgroundColor', () => {
    const { buffer } = generate('emo\nji', {
      backgroundColor: '#1fddffff'
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('textAlign', () => {
    const { buffer } = generate('emo\nji', {
      textAlign: 'right'
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('textSizeFixed', () => {
    const { buffer } = generate('emo\nji', {
      textSizeFixed: true
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('disableStretch', () => {
    const { buffer } = generate('emo\nji', {
      disableStretch: true
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('typefaceFile', () => {
    const { buffer } = generate('えも\nじ', {
      typefaceFile: './externals/libemoji/example/NotoSansMonoCJKjp-Bold.otf'
    });

    expect(buffer).toMatchImageSnapshot();
  });

  test('typefaceName', () => {
    const { buffer } = generate('emo\nji', {
      typefaceName: 'Arial'
    });

    expect(buffer).toMatchImageSnapshot();
  });
});
