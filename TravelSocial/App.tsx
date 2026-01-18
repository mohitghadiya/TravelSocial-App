// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './src/navigation/RootNavigator';
// import { ThemeProvider } from './src/context/ThemeContext';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </ThemeProvider>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { TripProvider } from './src/context/TripContext';

export default function App() {
  return (
    <TripProvider>
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
    </TripProvider>
  );
}