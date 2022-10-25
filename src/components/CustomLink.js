import React from 'react'
import { useResolvedPath, useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function CustomLink({ to, className, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: `${resolvedPath.pathname}/*`, end: true })
    return (
        <li>
            <Link 
                to={to} 
                className={
                    isActive
                    ? className + ' bg-primiry-color text-white relative'
                    : className + ' hover:bg-slate-100 text-text-color'
                }
                {...props}
            >
                {
                    isActive 
                    ? [
                        ...children, 
                        <div key={1} className='absolute top-0 -right-5 h-full w-1 rounded-t-full rounded-b-full bg-primiry-color'>
                        </div>
                    ]
                    : children
                }

            </Link>
        </li>
    )
}

