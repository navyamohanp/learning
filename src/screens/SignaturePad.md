# SignaturePad Component

The `SignaturePad` component provides a canvas for users to draw their signature and save it as an image. It uses `@shopify/react-native-skia` for high-performance drawing and `react-native-gesture-handler` for smooth touch interactions.

## Features

- **Smooth Drawing**: Uses Skia paths for fluid signature capture.
- **Clear Canvas**: Button to reset the drawing area.
- **Save & Share**: Exports the signature as a PNG image and opens the system share sheet.
- **Platform Specific Export**: Handles Android and iOS differences for reliable sharing.

## Dependencies

- `@shopify/react-native-skia`: For rendering the drawing canvas.
- `react-native-gesture-handler`: For capturing touch gestures.
- `react-native-share`: For sharing the exported image.
- `react-native-fs`: For saving the image to a temporary file on Android.

## Implementation Details

### Drawing Logic

The component tracks the user's finger movement using a `Pan` gesture.

- `onStart`: Creates a new Skia path and moves to the starting coordinates.
- `onUpdate`: Adds lines to the current path as the finger moves.
- `onEnd`: Commits the current path to the state.

### Export Logic (`handleSave`)

The export functionality is tailored for each platform to ensure reliability:

#### iOS

- **Method**: Base64 Data URL.
- **Reason**: iOS handles large base64 strings well in the share sheet.
- **Process**:
  1.  Captures the canvas as an image.
  2.  Encodes it to base64.
  3.  Constructs a data URL (`data:image/png;base64,...`).
  4.  Passes this URL directly to `Share.open`.

#### Android

- **Method**: Temporary File.
- **Reason**: Android often fails when sharing large base64 strings directly via Intents (TransactionTooLargeException).
- **Process**:
  1.  Captures the canvas as an image.
  2.  Encodes it to base64.
  3.  Writes the base64 data to a temporary file (`signature.png`) in the app's cache directory using `react-native-fs`.
  4.  Passes the file URI (`file://...`) to `Share.open`.
  5.  **Note**: `react-native-fs` is required dynamically (`require`) to avoid potential linking issues on iOS if the library is not fully configured for that platform.

## Usage

This component is currently implemented as a screen (`src/screens/sign.tsx`). To use it, navigate to it via your app's navigation stack.

```tsx
// Example navigation
navigation.navigate('SignaturePad');
```
