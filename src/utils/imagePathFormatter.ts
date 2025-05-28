/**
 * Converts a local blob storage URL to a CDN URL.
 * Example:
 *   http://127.0.0.1:10000/devstoreaccount1/product-images/733a0338-46d2-4bbd-8239-10e145b4bdc3.jpg
 * becomes:
 *   https://project.atakaradag.dev/images/devstoreaccount1/product-images/733a0338-46d2-4bbd-8239-10e145b4bdc3.jpg
 */
export function formatImagePath(inputUrl: string): string {
    try {
        const url = new URL(inputUrl);
        // Remove leading slash from pathname if present
        let path = url.pathname.replace(/^\/+/, '');
        // Remove leading "images/" if present to avoid double "images/images/"
        if (path.startsWith('images/')) {
            path = path.substring('images/'.length);
        }
        return `https://project.atakaradag.dev/images/${path}`;
    } catch {
        // If input is not a valid URL, return as is or handle error as needed
        return inputUrl;
    }
}