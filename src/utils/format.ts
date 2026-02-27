export function formatDate(input: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(input);
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, '-');
}
