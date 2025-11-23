import React from 'react'
import dayjs from 'dayjs'
import { navLinks as data} from '#constants/index.js'
import { navIcons } from '#constants/index.js'
const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className='font-bold'>Sagar's Portfolio</p>
        <ul>
          {
            data.map(({ id, name }) => (
              <li key={ id } >
                <p>
                  {name}
                </p>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={ id } >
              <img src={ img } className='icon-hover' alt={`icon-${id}`} />
            </li>
          ))} 
        </ul>
              <time>  {dayjs().format('MMMM D, YYYY h:mm A')}</time>
      </div>


    </nav>
  )
}

export default Navbar
