import DOMPurify from 'dompurify';

// Defense-in-depth for user-generated HTML (forum + ticket posts). The backend
// already sanitizes this content on write via `sanitize_html`; this is a second
// barrier for anything that predates that or slips through.
//
// KEEP IN SYNC with the backend allowlist in
// vyhub/deps/vyhub_common/helpers/__init__.py (`sanitize_html`).
// This list must stay a superset of the backend's, otherwise legitimate content
// the backend allowed would be stripped here. If you change one list, change the other.
const ALLOWED_TAGS = [
  'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'p', 'ul', 'ol', 's', 'span',
  'li', 'br', 'sub', 'sup', 'hr', 'img', 'blockquote', 'pre', 'u', 'b', 'i', 'strike',
  'label', 'input', 'figure', 'div', 'table', 'tbody', 'tr', 'td', 'th', 'colgroup', 'col', 'row',
  'figcaption', 'code',
];

// Union of the backend's per-tag attributes (a/img/div/*). DOMPurify uses a
// global attribute allowlist rather than per-tag, which is an acceptable superset.
const ALLOWED_ATTR = [
  'href', 'name', 'target', 'title', 'id', 'rel', // a
  'alt', 'src', 'width', 'height', // img
  'style', 'class', // *
  'data-oembed-url', // div
  'data-video-src', // div - carries the embed URL for the click-to-load video placeholder
];

// Backend permits the `smb` protocol in addition to DOMPurify's defaults
// (http/https/ftp/mailto/tel/...). Add it so smb links aren't stripped.
const ALLOWED_URI_REGEXP = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|smb):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

export function sanitizeUserHtml(html: string | null | undefined): string {
  if (html == null) return '';

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP,
  });
}

export default sanitizeUserHtml;
