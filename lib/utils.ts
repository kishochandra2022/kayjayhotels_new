
// FIX: Export `processHtmlForLazyLoading` function to resolve 'File is not a module' error.
export function processHtmlForLazyLoading(htmlString: string): string {
  if (typeof DOMParser === 'undefined' || !htmlString) {
    return htmlString; // Return original if DOMParser not available or htmlString is empty
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Process images for lazy loading
  doc.querySelectorAll('img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async'); // Good practice for performance
    // Optional: add a minimal style for better rendering before load
    // img.style.minHeight = '100px'; 
    // img.style.backgroundColor = '#F3F4F6'; // Could add a placeholder background
  });

  // Process iframes for lazy loading and responsiveness
  doc.querySelectorAll('iframe').forEach((iframe) => {
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true'); // Allow full screen for video iframes
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'); // Common for embedded videos

    // Create a responsive wrapper for the iframe
    const wrapper = doc.createElement('div');
    // Using inline styles for direct HTML manipulation
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    // Standard 16:9 aspect ratio for embedded videos
    wrapper.style.paddingTop = '56.25%'; // (9 / 16) * 100%
    wrapper.style.marginBottom = '1.25em'; // Match prose paragraph margin

    // Apply styles to the iframe itself to fit the wrapper
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none'; // Ensure no default border

    // Insert the wrapper before the iframe and move the iframe into the wrapper
    iframe.parentNode?.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);
  });

  return doc.body.innerHTML;
}
