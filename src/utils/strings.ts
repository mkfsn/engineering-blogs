export function normalizeSource(name: string): string {
    return name.replace(" ", "-").toLowerCase();
}
