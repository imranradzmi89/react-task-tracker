import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
 
//using title default prop
 const Header = ({title, onAdd, showAdd }) => {
    const location = useLocation()
     return (
         <header className = 'header'>
            <h1 style= {{ textDecorationLine: 'underline'}}>{ title }</h1>
            {location.pathname === '/' && (<Button  color = { showAdd ? 'red' : 'green' } 
            text = {showAdd ? 'Close' : 'Add' } 
            onClick = {onAdd} 
            />
            )}
         </header>
     )
 }
 
//default property
Header.defaultProps= {
    title: 'Task Tracker ',
} 

//prop model
Header.propTypes = {
    title: PropTypes.string.isRequired,
}



 export default Header
 