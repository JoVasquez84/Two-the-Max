import React from 'react'
import Navbar from './Navbar.js'
import NavItem from './NavItem.js'
import DropdownItem from './DropdownMenu'
import { ReactComponent as BellIcon } from './navIcons/bell.svg'
import { ReactComponent as MessengerIcon } from './navIcons/messenger.svg'
import { ReactComponent as PlusIcon } from './navIcons/plus.svg'
import { ReactComponent as CaretIcon } from './navIcons/caret.svg'


const NavRender = () => {
  return (
    <Navbar>
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<CaretIcon />} >
        <DropdownItem/>
      </NavItem>
    </Navbar>
  )
}

export default NavRender