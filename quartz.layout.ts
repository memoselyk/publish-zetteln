import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { defaultOptions } from "./quartz/components/Explorer"

const SEEDS_FOLDER = "wip_Samen";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/jackyzha0/quartz",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

const explorerMapFileToDisplayName = (node) => {
  if (!node.file && node.name === SEEDS_FOLDER) {
    node.displayName = "🫘 Samen";
  }
}

const explorerSortFn = (a, b) => {
  if (a.name === SEEDS_FOLDER) return 1;
  if (b.name === SEEDS_FOLDER) return -1;
  return defaultOptions.sortFn(a, b);
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      mapFn: explorerMapFileToDisplayName,
      sortFn: explorerSortFn,
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      mapFn: explorerMapFileToDisplayName,
      sortFn: explorerSortFn,
    })),
  ],
  right: [],
}
