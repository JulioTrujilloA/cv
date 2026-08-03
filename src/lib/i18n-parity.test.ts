import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
import { STRINGS } from './ui-strings';

// Collect "path: kind" signatures so EN and ES can be compared structurally —
// same keys, same array lengths, same value kinds — without comparing the
// translated values themselves.
function shape(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) {
    return [
      `${path}: array(${value.length})`,
      ...value.flatMap((v, i) => shape(v, `${path}[${i}]`)),
    ];
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  }
  return [`${path}: ${typeof value}`];
}

describe('EN/ES parity', () => {
  it('ui-strings has the same keys in both languages', () => {
    expect(shape(STRINGS.es)).toEqual(shape(STRINGS.en));
  });

  const yamlUrl = new URL('../../portfolio.config.yaml', import.meta.url);
  const config = load(readFileSync(yamlUrl, 'utf8')) as {
    content: { en: Record<string, unknown>; es: Record<string, unknown> };
  };

  it('portfolio.config.yaml content.en and content.es share the same structure', () => {
    expect(shape(config.content.es)).toEqual(shape(config.content.en));
  });

  it('language levels keep the internal English keys in both languages', () => {
    const levels = (c: Record<string, unknown>) =>
      (c.languages as { level: string }[]).map((l) => l.level);
    expect(levels(config.content.es)).toEqual(levels(config.content.en));
  });
});
