import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import HomeStack from './HomeStack'

const Drawer = createDrawerNavigator(
    {
        Home: HomeStack,
    }
)

export default Drawer;
