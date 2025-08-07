### Slug Link Follower

This plugin enhances your Obsidian experience by improving the behavior of internal links to headings within the same note, both in **Live Preview** (editing mode) and reading mode.

### Features

- **Seamless Navigation**: Click on a Markdown link to a heading (e.g., `[My Heading](#my-heading)`) and be instantly taken to that heading, just as you would in reading mode.
- **Editing Mode Support**: Specifically designed to address the issue where clicking a heading link in Live Preview would open the link for editing rather than navigating to the destination.
- **Maintains Core Functionality**: This plugin only activates on internal heading links, ensuring that Obsidian's default behavior for other links (e.g., links to other notes or external websites) remains unchanged.

### How it Works

The plugin listens for click events on the document. When a link with an `href` that starts with `#` is clicked, it intercepts the default browser behavior and manually scrolls the user to the correct heading. It does this by:

1. Extracting the heading's "slug" (the lowercase, hyphenated version of the heading text) from the `href`.
2. Searching the active note's metadata cache for a heading with a matching slug.
3. Using Obsidian's API to open the current file and navigate to the found heading.

### Installation

1. Clone this repository into your Obsidian plugins folder (`your-vault/.obsidian/plugins/`).
2. Run `npm install` and `npm run build` from the plugin's directory.
3. Enable the "Slug Link Follower" plugin in the Obsidian settings under **Community plugins**.

Alternatively, once the plugin is approved and available on the community list:

1. Open Obsidian's **Settings**.
2. Go to **Community plugins** and click **Browse**.
3. Search for "Slug Link Follower".
4. Click **Install**, and then **Enable**.
