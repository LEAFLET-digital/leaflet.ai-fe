# Facility Management Components

This directory contains modular, reusable components for facility and camera management functionality.

## Components Structure

### 📁 Core Components

#### `FacilityCard.jsx`

- **Purpose**: Displays individual facility information in a card format
- **Props**:
  - `facility`: Facility object with details
  - `onEdit`: Callback for editing facility
  - `onAddCamera`: Callback for adding camera to facility
  - `onCameraClick`: Callback for camera item clicks
- **Features**: Shows facility info, camera count, camera preview list

#### `FacilityManageModal.jsx`

- **Purpose**: Modal for managing facility details and cameras
- **Props**:
  - `isOpen`: Modal visibility state
  - `onClose`: Close modal callback
  - `selectedFacility`: Facility to manage
  - `onCameraClick`, `onEditCamera`, `onDeleteCamera`, `onAddCamera`: Action callbacks
- **Features**: Detailed camera view, camera actions (view/edit/delete)

#### `AddFacilityModal.jsx`

- **Purpose**: Modal for creating new facilities
- **Props**:
  - `isOpen`: Modal visibility state
  - `onClose`: Close modal callback
  - `onSubmit`: Form submission callback
- **Features**: Form validation, facility creation

#### `AddCameraModal.jsx`

- **Purpose**: Modal for adding new cameras to facilities
- **Props**:
  - `isOpen`: Modal visibility state
  - `onClose`: Close modal callback
  - `selectedFacility`: Target facility for camera
  - `onSubmit`: Form submission callback
- **Features**: Camera form fields, AI model selection

#### `EditCameraModal.jsx`

- **Purpose**: Modal for editing existing camera details
- **Props**:
  - `isOpen`: Modal visibility state
  - `onClose`: Close modal callback
  - `selectedCamera`: Camera to edit
  - `onSubmit`: Form submission callback
- **Features**: Pre-populated form, camera updates

#### `CameraFormFields.jsx`

- **Purpose**: Reusable form fields for camera forms
- **Props**:
  - `formData`: Current form data
  - `onFormDataChange`: Form data update callback
  - `sides`: Available direction options
  - `aiVisionModels`: Available AI model options
- **Features**: Shared form logic between add/edit camera modals

## 📄 Main Page Integration

### `facility.jsx` (Main Page)

- **Reduced from 1300+ lines to ~300 lines**
- **Responsibilities**:
  - State management
  - API calls
  - Modal coordination
  - Navigation logic
- **Components Used**: All facility components above

## 🔄 Component Communication

```
facility.jsx (Parent)
    ├── FacilityCard (Multiple instances)
    ├── FacilityManageModal
    │   └── Uses camera action callbacks
    ├── AddFacilityModal
    ├── AddCameraModal
    │   └── CameraFormFields
    └── EditCameraModal
        └── CameraFormFields
```

## 🎯 Benefits of Refactoring

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used in other parts of the application
3. **Testability**: Smaller components are easier to unit test
4. **Readability**: Clear separation of concerns
5. **Performance**: Better React rendering optimization
6. **Development**: Easier to work on individual features

## 🔧 API Integration

All components receive their data and callbacks as props, maintaining clean separation between:

- **UI Components**: Handle presentation and user interaction
- **Parent Component**: Manages state and API calls
- **API Layer**: Handled in `manageCameraFacilityApi`

## 📝 Usage Example

```jsx
import { FacilityCard, AddCameraModal } from "../components/facility";

function MyComponent() {
  return (
    <div>
      <FacilityCard
        facility={facilityData}
        onEdit={handleEdit}
        onAddCamera={handleAddCamera}
        onCameraClick={handleCameraClick}
      />

      <AddCameraModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedFacility={selectedFacility}
        onSubmit={handleCameraSubmit}
      />
    </div>
  );
}
```

## 🚀 Future Enhancements

1. **Add PropTypes/TypeScript**: For better type safety
2. **Add Unit Tests**: For each component
3. **Add Storybook**: For component documentation
4. **Optimize Renders**: With React.memo where appropriate
5. **Add Error Boundaries**: For better error handling
