import { Plugin, MarkdownView } from 'obsidian';

export default class SlugLinkFollower extends Plugin {
  async onload() {
    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (!target) return;

      let href = target.getAttribute('href');

      // Check if we are in Live Preview (editing mode) and the href is generic.
      const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (activeView && href === '#') {
        const editor = activeView.editor;
        const cursor = editor.getCursor();
        const lineText = editor.getLine(cursor.line);

        // This regex extracts the link from the Markdown syntax around the cursor.
        const linkRegex = /\[[^\]]*\]\(([^)]*)\)/g;
        let match;
        
        while ((match = linkRegex.exec(lineText)) !== null) {
          if (cursor.ch >= match.index && cursor.ch <= match.index + match[0].length) {
            href = match[1];
            break;
          }
        }
      }

      // Only proceed if the href is a valid internal anchor link.
      if (!href || !href.startsWith('#') || href.length <= 1) {
        return;
      }
      
      evt.preventDefault();

      const linkSlug = href.substring(1);
      const activeFile = this.app.workspace.getActiveFile();
      if (!activeFile) return;

      const cache = this.app.metadataCache.getFileCache(activeFile);
      if (!cache) return;

      const heading = cache?.headings?.find((h) => {
        const headingSlug = h.heading.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
        return headingSlug === linkSlug;
      });

      if (heading) {
        const leaf = this.app.workspace.getLeaf(false);
        leaf.openFile(activeFile, { eState: { subpath: heading.heading } });
      }
    });
  }

  onunload() {}
}