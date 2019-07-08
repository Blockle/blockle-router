# blockle-router

Lightweight (browser only) router for React ~3k gzip.  
Customisable with history

## Get started

Install with yarn

```bash
yarn add @blockle/router
```

Install with npm

```bash
npm install --save @blockle/router
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
