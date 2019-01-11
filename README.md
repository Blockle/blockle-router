# blockle-router


## Get started

Install with yarn

```bash
yarn add @blockle/router history
```

Install with npm

```bash
npm install --save @blockle/router history
```

### Basic example

```tsx
import { Router, Route, Link } from '@blockle/router';
import { createHashHistory } from 'history';

render(
  <Router history={createHashHistory}>
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
