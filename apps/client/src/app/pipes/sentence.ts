import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentence',
})
export class SentencePipe implements PipeTransform {
  transform(value: string): string {
    if (value?.length === 0) {
      return value;
    }

    const trimmedValue = value?.trim();
    const firstChar = trimmedValue?.charAt(0)?.toUpperCase();
    const lastChar = trimmedValue?.charAt(trimmedValue?.length - 1);

    if (firstChar === trimmedValue?.charAt(0) && lastChar === '.') {
      return trimmedValue;
    }

    return firstChar + trimmedValue?.slice(1) + (lastChar === '.' ? '' : '.');
  }
}
