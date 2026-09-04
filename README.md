# @devex/ui

React primitives and documentation components for dual-reader engineering docs. No Tailwind, no shadcn. Tokens, CSS modules, original components. Storybook is the catalog. The package lives in `devex/`.

```bash
cd devex && npm i && npm run storybook
```

Catalog: [http://localhost:6006](http://localhost:6006). Package docs: [`devex/README.md`](./devex/README.md).

```ts
import '@devex/ui/styles.css';
import { Button } from '@devex/ui';
import { PageMasthead, Stream } from '@devex/ui/docs';
```

Load `styles.css` once. Do not deep-import `devex/src`. Overlay primitives that use hooks are client components.

See [devex/CONTRIBUTING.md](./devex/CONTRIBUTING.md) for the review bar.
