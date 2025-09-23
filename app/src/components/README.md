# Components Documentation

This directory contains reusable React components organized by category to maintain clean architecture and promote code reuse.

## Directory Structure

```
components/
├── ui/                 # Basic UI components
├── layout/            # Layout-specific components
├── common/            # Domain-specific reusable components
├── Navbar.jsx         # Legacy navigation component
├── Footer.jsx         # Legacy footer component
├── SideNavbar.jsx     # Legacy sidebar component
└── index.js           # Central export file
```

## UI Components (`/ui`)

Basic, reusable UI components that form the foundation of the design system.

### Button

Versatile button component with multiple variants and states.

```jsx
import { Button } from '../components';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>

<Button variant="secondary" loading={isLoading}>
  Save
</Button>
```

**Props:**

- `variant`: "primary" | "secondary" | "ghost" | "danger" | "success"
- `size`: "sm" | "md" | "lg" | "xl"
- `loading`: boolean
- `disabled`: boolean
- `icon`: ReactNode

### Card

Flexible card container with consistent styling and sub-components.

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components";

<Card variant="default" hover={true}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>;
```

**Props:**

- `variant`: "default" | "glass" | "solid" | "gradient"
- `hover`: boolean
- `padding`: string (Tailwind classes)

### Input

Styled input component with various states and features.

```jsx
import { Input, SearchInput } from '../components';

<Input
  type="text"
  label="Username"
  placeholder="Enter username"
  error={errorMessage}
  icon={<UserIcon />}
/>

<SearchInput
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**Props:**

- `variant`: "default" | "glass" | "solid"
- `size`: "sm" | "md" | "lg"
- `label`: string
- `error`: string
- `icon`: ReactNode
- `rightIcon`: ReactNode

### Badge

Status indicators and labels.

```jsx
import { Badge } from '../components';

<Badge variant="success" dot>Online</Badge>
<Badge variant="danger">Offline</Badge>
```

**Props:**

- `variant`: "default" | "primary" | "success" | "warning" | "danger" | "info" | "online" | "offline"
- `size`: "sm" | "md" | "lg"
- `dot`: boolean

### Stat

Display metrics and statistics.

```jsx
import { Stat } from "../components";

<Stat
  title="Active Users"
  value="1,234"
  description="This month"
  color="blue"
  change="+12%"
  changeType="positive"
/>;
```

**Props:**

- `title`: string
- `value`: string | number
- `description`: string
- `icon`: ReactNode
- `color`: "blue" | "green" | "purple" | "yellow" | "red" | "cyan" | "orange"
- `change`: string
- `changeType`: "positive" | "negative"

### Grid

Responsive grid layout component.

```jsx
import { Grid, GridItem } from "../components";

<Grid cols="3" gap="6" responsive={true}>
  <GridItem span="2">Content</GridItem>
  <GridItem>Sidebar</GridItem>
</Grid>;
```

**Props:**

- `cols`: string (number of columns)
- `gap`: string (Tailwind gap value)
- `responsive`: boolean

### Loading

Loading states and spinners.

```jsx
import { Loading } from '../components';

<Loading size="lg" text="Loading..." />
<Loading overlay={true} />
```

**Props:**

- `size`: "sm" | "md" | "lg" | "xl"
- `color`: "blue" | "white" | "gray"
- `text`: string
- `overlay`: boolean

## Layout Components (`/layout`)

Components for page structure and layout patterns.

### PageContainer

Main page wrapper with consistent spacing.

```jsx
import { PageContainer } from "../components";

<PageContainer maxWidth="7xl" padding="p-6">
  Page content
</PageContainer>;
```

### PageHeader

Standardized page headers with titles and actions.

```jsx
import { PageHeader, Button } from "../components";

<PageHeader
  title="Dashboard"
  description="Monitor your security system"
  actions={<Button variant="primary">Add Item</Button>}
  breadcrumb={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
/>;
```

### Sidebar

Sidebar container with header, content, and footer sections.

```jsx
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "../components";

<Sidebar width="w-80">
  <SidebarHeader>
    <h3>Sidebar Title</h3>
  </SidebarHeader>
  <SidebarContent scrollable={true}>Sidebar content</SidebarContent>
  <SidebarFooter>Footer content</SidebarFooter>
</Sidebar>;
```

### TwoColumnLayout

Responsive two-column layout.

```jsx
import { TwoColumnLayout } from "../components";

<TwoColumnLayout
  leftColumn={<MainContent />}
  rightColumn={<Sidebar />}
  leftWidth="flex-1"
  rightWidth="w-80"
  gap="gap-6"
/>;
```

## Common Components (`/common`)

Domain-specific components for the security camera application.

### CameraCard

Display camera information in a card format.

```jsx
import { CameraCard } from "../components";

<CameraCard
  camera={cameraData}
  isSelected={selectedId === camera.id}
  onClick={handleCameraSelect}
/>;
```

### CameraFeed

Display camera feed with status and controls.

```jsx
import { CameraFeed } from "../components";

<CameraFeed camera={selectedCamera} width="w-[800px]" height="h-[400px]" />;
```

### StatsGrid

Grid of statistics with consistent formatting.

```jsx
import { StatsGrid } from "../components";

const stats = [
  { title: "FPS", value: "30", color: "blue" },
  { title: "Resolution", value: "1920x1080", color: "green" },
];

<StatsGrid stats={stats} cols="4" />;
```

### EmptyState

Empty state placeholder with optional action.

```jsx
import { EmptyState } from "../components";

<EmptyState
  icon="📷"
  title="No cameras found"
  description="Add your first camera to get started"
  actionText="Add Camera"
  onAction={handleAddCamera}
/>;
```

## Usage Guidelines

### Import Strategy

Use the central index file for clean imports:

```jsx
// Good
import { Button, Card, PageContainer, CameraCard } from "../components";

// Avoid
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
```

### Consistency

- Use the design system components instead of custom styling
- Follow the established color palette and sizing conventions
- Maintain consistent spacing using the Grid and layout components

### Customization

Components accept `className` props for additional styling when needed:

```jsx
<Card className="custom-shadow border-red-500">Custom styled card</Card>
```

### Performance

- Components use `forwardRef` for better performance and ref forwarding
- Memoization is applied where appropriate
- Props are validated to prevent runtime errors

## Migration from Legacy Code

When refactoring existing components:

1. Replace custom cards with the `Card` component system
2. Use `Button` instead of custom button styling
3. Replace manual grid layouts with the `Grid` component
4. Use `PageContainer` and `PageHeader` for consistent page structure
5. Implement domain-specific components from the `common` directory

## Best Practices

1. **Composition over Configuration**: Prefer composing smaller components
2. **Consistent Props**: Follow established prop naming conventions
3. **Accessibility**: Components include basic accessibility features
4. **Documentation**: Document custom props and usage patterns
5. **Testing**: Write tests for complex component logic
6. **Performance**: Use React.memo for components that render frequently

## Contributing

When adding new components:

1. Place in appropriate directory (ui/layout/common)
2. Follow existing prop patterns and naming conventions
3. Include documentation and usage examples
4. Export from the appropriate index file
5. Update this README with component documentation
