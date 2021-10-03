import React, { useState } from 'react'
import { ReactComponent as CogIcon } from './navIcons/cog.svg'
import { ReactComponent as ChevronIcon } from './navIcons/chevron.svg'
import { ReactComponent as ArrowIcon } from './navIcons/arrow.svg'
import { CSSTransition } from 'react-transition-group'


const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)

    const calcHeight = (el) => {
        const height = el.offsetHeight
        setMenuHeight(height)
    } 

    const DropdownItem = (props) => {
        return (
            <a href='#' className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className='icon-button'>{props.leftIcon}</span>
                {props.children}
                <span className='icon-right'>{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className='dropdown' style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit 
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
                >
                    <div classname='menu'>
                        <DropdownItem>My Profile</DropdownItem>
                        <DropdownItem 
                            leftIcon={<CogIcon />}
                            rightIcon={<ChevronIcon />}
                            goToMenu='settings' >
                                Settings
                        </DropdownItem>
                    </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
                onEnter={calcHeight}
                >
                    <div classname='menu'>
                        <DropdownItem leftIcon={<ArrowIcon />} goToMenu='main' />
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                    </div>
            </CSSTransition>
        </div>
    )
}

export default DropdownMenu