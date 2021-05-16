# @blockle/router

Lightweight (browser only) router for React ~3k gzip.  
Customisable with history

## Get started

Install with yarn

```bash
yarn add @blockle/router history
```

Install with npm

```bash
npm install --save @blockle/router history
```

### Example

```tsx
import { Router, Route, Link } from '@blockle/router';
import createHistory from 'history/createBrowserHistory';

render(
  <Router history={createHistory}>
    <Route path="/" exact>
      Home
      <Link to="/contact">Contact</Link>
    </Route>
    <Route path="/contact">
      Contact
      <Link to="/">Home</Link>
    </Route>
  </Router>
);
```

### Route params

```tsx
import { Router, Route, Link } from '@blockle/router';
import createHistory from 'history/createBrowserHistory';

render(
  <Router history={createHistory}>
    <Route
      path="/detail/:id/:name"
      render={(match, { id, name }) => {
        match &&
          <pre>
            {id} - {name}
          </pre>
      }}
    />
  </Router>
);
```

### 404

```tsx
import { Router, Route, Link } from '@blockle/router';
import createHistory from 'history/createBrowserHistory';

render(
  <Router history={createHistory}>
    <Route path="/contact">
      Contact
    </Route>
    <Route path="/about">
      Contact
    </Route>
    <Route noMatch>
      Route not found
    </Route>
  </Router>
);
```

### RouteGroup

NOTE RouteGroup handle their own 404

```tsx
import { Router, Route, Link } from '@blockle/router';
import createHistory from 'history/createBrowserHistory';

render(
  <Router history={createHistory}>
    <RouteGroup>
      {/* Matches "/contact */}
      <Route path="/contact">
        Contact
      </Route>
      <Route path="/about">
        Contact
      </Route>
      <Route noMatch>
        Route not found
      </Route>
    </RouteGroup>

    <RouteGroup baseUrl="/foo">
      {/* Matches "/foo/contact */}
      <Route path="/contact">
        Contact
      </Route>
      <Route path="/about">
        Contact
      </Route>
      <Route noMatch>
        Route not found
      </Route>
    </RouteGroup>
  </Router>
);
```

### Link

* `to` `string`
* `replace` `boolean` default `false`
* `className` `string`
* `activeClassName` `string` default `'is-active'`
* `onClick` `MouseEventHandler<HTMLAnchorElement>`

```tsx
import { Router, Link } from '@blockle/router';
import createHistory from 'history/createBrowserHistory';

render(
  <Router>
    <Link to="/foo">Link content</Link>
    <Link to="/foo" replace>Link content</Link>
  </Router>
);
```
