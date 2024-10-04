export function keepCursorEnd(target: HTMLElement) {
  if (window.getSelection) {
    target.focus();
    const range = window.getSelection();
    range?.selectAllChildren(target);
    range?.collapseToEnd();
  } else if ((document as any).selection) {
    const range = (document as any).selection.createRange();
    range.moveToElementText(target);
    range.collapse(false);
    range.select();
  }
}

export function getPasteText(event: ClipboardEvent): string {
  const clipboardData = event.clipboardData || (window as any).clipboardData;
  let pasteText = '';
  if (clipboardData && clipboardData.getData) {
    pasteText = clipboardData.getData('text/plain');
  }
  return pasteText;
}
